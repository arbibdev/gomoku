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

static long	get_prev_alignments(t_data *data, int x, int y, unsigned char color)
{
	long	heuristic;

	heuristic = 0;
	data->put_stones[y][x] = 0;
	data->params.x = x;
	data->params.y = y;
	init_increment(data, 0, -1);
	heuristic += compute_prev_alignment(data, color);
	init_increment(data, 1, -1);
	heuristic += compute_prev_alignment(data, color);
	init_increment(data, 1, 0);
	heuristic += compute_prev_alignment(data, color);
	init_increment(data, 1, 1);
	heuristic += compute_prev_alignment(data, color);
	init_increment(data, 0, 1);
	heuristic += compute_prev_alignment(data, color);
	init_increment(data, -1, 1);
	heuristic += compute_prev_alignment(data, color);
	init_increment(data, -1, 0);
	heuristic += compute_prev_alignment(data, color);
	init_increment(data, -1, -1);
	heuristic += compute_prev_alignment(data, color);
	data->put_stones[y][x] = color;
	return (heuristic);
}

static long	get_new_alignments(t_data *data, int x, int y, unsigned char color,
				unsigned char depth)
{
	long	heuristic;

	heuristic = 0;
	data->params.x = x;
	data->params.y = y;
	init_increment(data, 0, -1);
	data->params.set_winner = 1;
	heuristic += compute_new_alignment(data, color, depth);
	init_increment(data, 1, -1);
	data->params.set_winner = 1;
	heuristic += compute_new_alignment(data, color, depth);
	init_increment(data, 1, 0);
	data->params.set_winner = 1;
	heuristic += compute_new_alignment(data, color, depth);
	init_increment(data, 1, 1);
	data->params.set_winner = 1;
	heuristic += compute_new_alignment(data, color, depth);
	heuristic += compute_single_stone(x, y, data) * data->factor[y][x];
	return (heuristic);
}

static int	compute_blocking(t_data *data, int x, int y)
{
	int	blocking;

	blocking = 0;
	if (x >= 0 && x < SB && y >= 0 && y < SB)
	{
		if (enclosed_stone(x, y, data))
			blocking = 2 * SINGLE_STONE * data->factor[y][x];
		else
			blocking = SINGLE_STONE * data->factor[y][x];
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

long	compute_new_stone(t_data *data, int x, int y, unsigned char color,
			unsigned char depth)
{
	long	prev_alignment;
	long	new_alignment;
	long	alignment_blocking;
	int		single_stones_blocking;

	data->winner = 0;
	data->params.set_winner = 0;
	prev_alignment = get_prev_alignments(data, x, y, color);
	new_alignment = get_new_alignments(data, x, y, color, depth);
	data->params.set_winner = 0;
	alignment_blocking = get_alignments_blocking(data, x, y, color);
	single_stones_blocking = compute_single_stones(data, x, y);
	return (new_alignment - prev_alignment
		+ alignment_blocking + single_stones_blocking);
}
