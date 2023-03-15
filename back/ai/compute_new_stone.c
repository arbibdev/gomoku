/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   compute_new_stone.c                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/03 12:09:36 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/03 12:09:37 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static int	get_prev_alignments(t_data *data, int x, int y, unsigned char color)
{
	int	heuristic;

	heuristic = 0;
	data->put_stones[y][x] = 0;
	data->params.x = x;
	data->params.y = y;
	init_params(data, 0, -1);
	heuristic += compute_prev_alignment(data);
	init_params(data, 1, -1);
	heuristic += compute_prev_alignment(data);
	init_params(data, 1, 0);
	heuristic += compute_prev_alignment(data);
	init_params(data, 1, 1);
	heuristic += compute_prev_alignment(data);
	init_params(data, 0, 1);
	heuristic += compute_prev_alignment(data);
	init_params(data, -1, 1);
	heuristic += compute_prev_alignment(data);
	init_params(data, -1, 0);
	heuristic += compute_prev_alignment(data);
	init_params(data, -1, -1);
	heuristic += compute_prev_alignment(data);
	data->put_stones[y][x] = color;
	return (heuristic);
}

static int	get_new_alignments(t_data *data, int x, int y, unsigned char color)
{
	int	heuristic;

	heuristic = 0;
	data->params.x = x;
	data->params.y = y;
	init_params(data, 0, -1);
	heuristic += compute_new_alignment(data, color);
	init_params(data, 1, -1);
	heuristic += compute_new_alignment(data, color);
	init_params(data, 1, 0);
	heuristic += compute_new_alignment(data, color);
	init_params(data, 1, 1);
	heuristic += compute_new_alignment(data, color);
	heuristic += compute_single_stone(x, y, data) * data->factor[y][x];
	heuristic += compute_new_opponent_alignments(data, x, y, color);
	return (heuristic);
}

static int	compute_blocking(t_data *data, int x, int y)
{
	int	blocking;

	blocking = 0;
	if (x >= 0 && x < SB && y >= 0 && y < SB)
	{
		if (enclosed_stone(x, y, data))
			blocking = 20 * data->factor[y][x];
		else
			blocking = 10 * data->factor[y][x];
	}
	else
		return (0);
	if (data->put_stones[y][x] == data->ai_color)
		return (-blocking);
	return (blocking);
}

static int	compute_single_stones(t_data *data, int x, int y)
{
	int	heuristic;

	heuristic = 0;
	heuristic += compute_blocking(data, x, y - 1);
	heuristic += compute_blocking(data, x + 1, y - 1);
	heuristic += compute_blocking(data, x + 1, y);
	heuristic += compute_blocking(data, x + 1, y + 1);
	heuristic += compute_blocking(data, x, y + 1);
	heuristic += compute_blocking(data, x - 1, y + 1);
	heuristic += compute_blocking(data, x - 1, y);
	heuristic += compute_blocking(data, x - 1, y - 1);
	return (heuristic);
}

int	compute_new_stone(t_data *data, int x, int y, unsigned char color)
{
	int	prev_alignment;
	int	new_alignment;
	int	single_stones_blocking;

	data->winner = 0;
	data->params.set_winner = 0;
	prev_alignment = get_prev_alignments(data, x, y, color);
	data->params.set_winner = 1;
	new_alignment = get_new_alignments(data, x, y, color);
	single_stones_blocking = compute_single_stones(data, x, y);
	return (new_alignment - prev_alignment + single_stones_blocking);
}
