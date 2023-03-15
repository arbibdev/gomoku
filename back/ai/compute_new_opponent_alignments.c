/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   compute_new_opponent_alignments.c                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/14 20:42:50 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/14 20:42:51 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static int	compute_new_opponent_alignment(t_data *data, unsigned char color)
{
	unsigned char	neighbour[2];
	unsigned char	size_alignment;
	unsigned char	factor;
	int				x;
	int				y;

	x = data->params.x + data->params.x_increment;
	y = data->params.y + data->params.y_increment;
	if (x >= 0 && x < SB && y >= 0 && y < SB)
	{
		if (data->put_stones[y][x] != color)
			return (0);
	}
	else
		return (0);
	neighbour[0] = 1;
	data->params.x += data->params.x_increment;
	data->params.y += data->params.y_increment;
	size_alignment = get_size_alignment(data, &factor, &neighbour[1], color);
	data->params.x -= data->params.x_increment;
	data->params.y -= data->params.y_increment;
	return (get_alignment_value(size_alignment, neighbour,
			color, data) * factor);
}

static unsigned char	get_opponent_color(t_data *data, unsigned char color)
{
	if (color == data->ai_color)
		return (data->player_color);
	return (data->ai_color);
}

int	compute_new_opponent_alignments(t_data *data, int x, int y,
		unsigned char color)
{
	unsigned char	opponent_color;
	int				heuristic;

	opponent_color = get_opponent_color(data, color);
	heuristic = 0;
	data->params.x = x;
	data->params.y = y;
	init_params(data, 0, -1);
	heuristic += compute_new_opponent_alignment(data, opponent_color);
	init_params(data, 1, -1);
	heuristic += compute_new_opponent_alignment(data, opponent_color);
	init_params(data, 1, 0);
	heuristic += compute_new_opponent_alignment(data, opponent_color);
	init_params(data, 1, 1);
	heuristic += compute_new_opponent_alignment(data, opponent_color);
	init_params(data, 0, 1);
	heuristic += compute_new_opponent_alignment(data, opponent_color);
	init_params(data, -1, 1);
	heuristic += compute_new_opponent_alignment(data, opponent_color);
	init_params(data, -1, 0);
	heuristic += compute_new_opponent_alignment(data, opponent_color);
	init_params(data, -1, -1);
	heuristic += compute_new_opponent_alignment(data, opponent_color);
	return (heuristic);
}
