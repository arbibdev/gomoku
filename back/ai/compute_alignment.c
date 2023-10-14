/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   compute_alignment.c                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/13 17:54:07 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/13 17:54:52 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void	write_checked(t_data *data, unsigned char color,
				unsigned char direction)
{
	int				x;
	int				y;

	x = data->params.x;
	y = data->params.y;
	while (x >= 0 && x < SB && y >= 0 && y < SB
		&& data->put_stones[y][x] == color)
	{
		data->checked[direction][y][x] = 1;
		x += data->params.x_increment;
		y += data->params.y_increment;
	}
}

static void	get_first_neighbour(t_data *data, unsigned char *neighbour)
{
	int	x;
	int	y;

	x = data->params.x - data->params.x_increment;
	y = data->params.y - data->params.y_increment;
	*neighbour = 1;
	if (x >= 0 && x < SB && y >= 0 && y < SB
		&& !data->put_stones[y][x])
		*neighbour = 0;
}

long	compute_alignment(t_data *data, unsigned char direction)
{
	unsigned char	color;
	unsigned char	neighbour[2];
	unsigned char	size_alignment;
	unsigned char	factor;
	long			heuristic;

	if (data->checked[direction][data->params.y][data->params.x]
	|| !data->put_stones[data->params.y][data->params.x])
		return (0);
	get_first_neighbour(data, &neighbour[0]);
	color = data->put_stones[data->params.y][data->params.x];
	size_alignment = get_size_alignment(data, &factor, &neighbour[1], color);
	if (size_alignment == 1)
		return (0);
	heuristic = get_alignment_value(size_alignment, neighbour,
			color, data);
	if (!heuristic)
		return (0);
	write_checked(data, color, direction);
	return (heuristic * factor);
}
