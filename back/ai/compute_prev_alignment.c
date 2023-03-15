/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   compute_prev_aignment.c                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/14 13:19:08 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/14 13:19:09 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static unsigned char	get_color(t_data *data)
{
	int	x;
	int	y;

	x = data->params.x + data->params.x_increment;
	y = data->params.y + data->params.y_increment;
	if (x >= 0 && x < SB && y >= 0 && y < SB)
		return (data->put_stones[y][x]);
	return (0);
}

int	compute_prev_alignment(t_data *data)
{
	unsigned char	neighbour[2];
	unsigned char	color;
	unsigned char	size_alignment;
	unsigned char	factor;

	color = get_color(data);
	if (!color)
		return (0);
	neighbour[0] = 0;
	data->params.x += data->params.x_increment;
	data->params.y += data->params.y_increment;
	size_alignment = get_size_alignment(data, &factor, &neighbour[1], color);
	data->params.x -= data->params.x_increment;
	data->params.y -= data->params.y_increment;
	return (get_alignment_value(size_alignment, neighbour,
			color, data) * factor);
}
