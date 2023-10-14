/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_alignments_blocking.c                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/15 17:32:19 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/15 17:32:20 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static long	compute_blocking(t_data *data, unsigned char color)
{
	unsigned char	size_alignment;
	unsigned char	factor;
	unsigned char	neighbour;
	long			blocking;

	data->params.x += data->params.x_increment;
	data->params.y += data->params.y_increment;
	if (!is_good_color(data, color, data->params.x, data->params.y))
		return (0);
	size_alignment = get_size_alignment(data, &factor, &neighbour, color);
	data->params.x -= data->params.x_increment;
	data->params.y -= data->params.y_increment;
	if (size_alignment == 1)
		return (0);
	blocking = my_pow(BASE_ALIGNMENT, size_alignment);
	if (neighbour == 1 && size_alignment < WIN_ALIGNMENT)
		blocking *= 2;
	blocking *= factor;
	// if (blocking >= 2147483648)
	// 	fprintf(data->fd, "ALERT\n");
	if (color == data->ai_color)
		return (-blocking);
	return (blocking);
}

long	get_alignments_blocking(t_data *data, int x, int y, unsigned char color)
{
	long			heuristic;
	unsigned char	opponent_color;

	opponent_color = get_opponent_color(data, color);
	heuristic = 0;
	data->params.x = x;
	data->params.y = y;
	init_increment(data, 0, -1);
	heuristic += compute_blocking(data, opponent_color);
	init_increment(data, 1, -1);
	heuristic += compute_blocking(data, opponent_color);
	init_increment(data, 1, 0);
	heuristic += compute_blocking(data, opponent_color);
	init_increment(data, 1, 1);
	heuristic += compute_blocking(data, opponent_color);
	init_increment(data, 0, 1);
	heuristic += compute_blocking(data, opponent_color);
	init_increment(data, -1, 1);
	heuristic += compute_blocking(data, opponent_color);
	init_increment(data, -1, 0);
	heuristic += compute_blocking(data, opponent_color);
	init_increment(data, -1, -1);
	heuristic += compute_blocking(data, opponent_color);
	return (heuristic);
}
