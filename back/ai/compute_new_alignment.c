/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   compute_new_alignment.c                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/14 17:40:24 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/14 17:40:25 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void	go_to_start_alignment(t_data *data, unsigned char color,
				int *x, int *y)
{
	while (*x >= 0 && *x < SB && *y >= 0 && *y < SB
		&& data->put_stones[*y][*x] == color)
	{
		*x += data->params.x_increment;
		*y += data->params.y_increment;
	}
}

static void	get_neighbour(t_data *data, int x, int y,
				unsigned char *neighbour)
{
	*neighbour = 1;
	if (x >= 0 && x < SB && y >= 0 && y < SB && !data->put_stones[y][x])
		*neighbour = 0;
}

int	compute_new_alignment(t_data *data, unsigned char color)
{
	unsigned char	neighbour[2];
	unsigned char	size_alignment;
	int				x;
	int				y;

	x = data->params.x;
	y = data->params.y;
	go_to_start_alignment(data, color, &x, &y);
	get_neighbour(data, x, y, &neighbour[0]);
	x -= data->params.x_increment;
	y -= data->params.y_increment;
	size_alignment = 0;
	while (x >= 0 && x < SB && y >= 0 && y < SB
		&& data->put_stones[y][x] == color)
	{
		size_alignment += 1;
		x -= data->params.x_increment;
		y -= data->params.y_increment;
	}
	if (size_alignment == 1)
		return (0);
	get_neighbour(data, x, y, &neighbour[1]);
	return (get_alignment_value(size_alignment, neighbour, color, data)
		* data->factor[data->params.y][data->params.x]);
}
