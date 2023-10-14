/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create_path.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/26 18:23:22 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/26 18:23:24 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static unsigned char	present_stone(t_data *data, int x, int y)
{
	if (x >= 0 && x < SB && y >= 0 && y < SB
		&& (data->put_stones[y][x] == WHITE
		|| data->put_stones[y][x] == BLACK))
		return (1);
	return (0);
}

static unsigned char	stone_in_line(t_data *data, int *x, int *y, int space)
{
	int	c;

	c = 0;
	while (c < space * 2)
	{
		if (present_stone(data, *x, *y))
			return (1);
		*x += data->params.x_increment;
		*y += data->params.y_increment;
		c += 1;
	}
	return (0);
}

static unsigned char	stone_in_space(t_data *data, int x, int y, int space)
{
	x = x - space;
	y = y - space;
	init_increment(data, 1, 0);
	if (stone_in_line(data, &x, &y, space))
		return (1);
	init_increment(data, 0, 1);
	if (stone_in_line(data, &x, &y, space))
		return (1);
	init_increment(data, -1, 0);
	if (stone_in_line(data, &x, &y, space))
		return (1);
	init_increment(data, 0, -1);
	if (stone_in_line(data, &x, &y, space))
		return (1);
	return (0);
}

static unsigned char	stone_around(t_data *data, int x, int y)
{
	int	c;

	c = 0;
	while (c < TREATMENT_SPACE)
	{
		if (stone_in_space(data, x, y, c + 1))
			return (1);
		c += 1;
	}
	return (0);
}

void	create_path(t_data *data, unsigned char path[PLACES_ON_BOARD][2], int *size_path)
{
	int	x;
	int	y;

	y = 0;
	*size_path = 0;
	while (y < SB)
	{
		x = 0;
		while (x < SB)
		{
			if (!data->put_stones[y][x] && stone_around(data, x, y))
			{
				path[*size_path][X] = x;
				path[*size_path][Y] = y;
				*size_path += 1;
			}
			x += 1;
		}
		y += 1;
	}
}
