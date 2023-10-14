/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   compute_captures.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/16 11:27:00 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/16 11:27:01 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void	write_captures(t_data *data, unsigned char captured[16][3], unsigned char *captures)
{
	int	x;
	int	y;

	x = data->params.x + data->params.x_increment;
	y = data->params.y + data->params.y_increment;
	captured[*captures][X] = x;
	captured[*captures][Y] = y;
	captured[*captures][FACTOR] = data->factor[y][x];
	x = data->params.x + data->params.x_increment * 2;
	y = data->params.y + data->params.y_increment * 2;
	captured[*captures + 1][X] = x;
	captured[*captures + 1][Y] = y;
	captured[*captures + 1][FACTOR] = data->factor[y][x];
	*captures += 2;
}

static void	check_capture(t_data *data, unsigned char captured[16][3], unsigned char *captures, unsigned char color)
{
	unsigned char	ennemy_color;
	int				x;
	int				y;
	int				c;

	if (color == WHITE)
		ennemy_color = BLACK;
	else
		ennemy_color = WHITE;
	x = data->params.x + data->params.x_increment;
	y = data->params.y + data->params.y_increment;
	c = 0;
	while (c < 2)
	{
		if (!(x >= 0 && x < SB && y >= 0 && y < SB
		&& data->put_stones[y][x] == ennemy_color))
		return ;
		x += data->params.x_increment;
		y += data->params.y_increment;
		c += 1;
	}
	if (!(x >= 0 && x < SB && y >= 0 && y < SB
		&& data->put_stones[y][x] == color))
		return ;
	write_captures(data, captured, captures);
}

int	compute_captures(t_data *data, unsigned char captured[16][3], unsigned char color)
{
	unsigned char	captures;
	data->params.x = data->params.x_path;
	data->params.y = data->params.y_path;
	captures = 0;
	init_increment(data, 0, -1);
	check_capture(data, captured, &captures, color);
	init_increment(data, 1, -1);
	check_capture(data, captured, &captures, color);
	init_increment(data, 1, 0);
	check_capture(data, captured, &captures, color);
	init_increment(data, 1, 1);
	check_capture(data, captured, &captures, color);
	init_increment(data, 0, 1);
	check_capture(data, captured, &captures, color);
	init_increment(data, -1, 1);
	check_capture(data, captured, &captures, color);
	init_increment(data, -1, 0);
	check_capture(data, captured, &captures, color);
	init_increment(data, -1, -1);
	check_capture(data, captured, &captures, color);
	// if (data->captures[color] + captures >= 10)
	// 	data->winner = 1;
	return (captures);
}