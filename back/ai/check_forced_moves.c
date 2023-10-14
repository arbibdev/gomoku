/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   check_forced_moves.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/31 22:21:17 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/31 22:21:18 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void	write_forced_move(unsigned char path[PLACES_ON_BOARD][2], int *size_path, int pos[2])
{
	path[*size_path][X] = pos[X];
	path[*size_path][Y] = pos[Y];
	*size_path += 1;
}

static signed char	value(t_data *data, int pos[2])
{
	if (pos[X] >= 0 && pos[X] < SB && pos[Y] >= 0 && pos[Y] < SB)
		return (data->put_stones[pos[Y]][pos[X]]);
	return (-1);
}

static void	check_each_combination(t_data *data, unsigned char path[PLACES_ON_BOARD][2],
				int *size_path, unsigned char color, unsigned char ennemy_color, int pos[4][2])
{
	if (value(data, pos[0]) == color
		&& value(data, pos[1]) == ennemy_color
		&& value(data, pos[2]) == 0)
		write_forced_move(path, size_path, pos[2]);
	if (value(data, pos[1]) == color
		&& value(data, pos[2]) == ennemy_color
		&& value(data, pos[3]) == 0)
		write_forced_move(path, size_path, pos[3]);
	if (value(data, pos[3]) == color
		&& value(data, pos[2]) == ennemy_color
		&& value(data, pos[1]) == 0)
		write_forced_move(path, size_path, pos[1]);
	if (value(data, pos[2]) == color
		&& value(data, pos[1]) == ennemy_color
		&& value(data, pos[0]) == 0)
		write_forced_move(path, size_path, pos[0]);
}

static void	check_capture_in_1_dir(t_data *data, int x, int y,
				unsigned char path[PLACES_ON_BOARD][2], int *size_path,
				unsigned char color, unsigned char ennemy_color,
				signed char increment[2])
{
	int	pos[4][2];

	pos[0][X] = x - increment[X] * 2;
	pos[0][Y] = y - increment[Y] * 2;
	pos[1][X] = x - increment[X];
	pos[1][Y] = y - increment[Y];
	pos[2][X] = x + increment[X];
	pos[2][Y] = y + increment[Y];
	pos[3][X] = x + increment[X] * 2;
	pos[3][Y] = y + increment[Y] * 2;
	check_each_combination(data, path, size_path, color, ennemy_color, pos);
}

static void	check_captures_in_3_dirs(t_data *data, int x, int y,
				unsigned char path[PLACES_ON_BOARD][2], int *size_path,
				unsigned char color, unsigned char ennemy_color,
				signed char increments[4][2])
{
	int	c;

	c = 0;
	while (c < 4)
	{
		if (!(data->params.x_increment == increments[c][X]
		&& data->params.y_increment == increments[c][Y]))
			check_capture_in_1_dir(data, x, y, path, size_path, color,
				ennemy_color, increments[c]);
		c += 1;
	}
}

static void	get_forced_moves(t_data *data, int x, int y,
				unsigned char path[PLACES_ON_BOARD][2], int *size_path,
				unsigned char color, unsigned char ennemy_color,
				unsigned char size_alignment,
				signed char increments[4][2])
{
	int			c;

	c = 0;
	while (c < size_alignment)
	{
		check_captures_in_3_dirs(data, x, y, path, size_path, color, ennemy_color, increments);
		x += data->params.x_increment;
		y += data->params.y_increment;
		c += 1;
	}
}

static void	check_alignment(t_data *data, int x, int y,
				unsigned char path[PLACES_ON_BOARD][2], int *size_path,
				unsigned char color, unsigned char ennemy_color,
				signed char increments[4][2])
{
	unsigned char	size_alignment;
	int				save_x;
	int				save_y;

	save_x = x;
	save_y = y;
	size_alignment = 0;
	while (x >= 0 && x < SB && y >= 0 && y < SB
	&& data->put_stones[y][x] == ennemy_color)
	{
		size_alignment += 1;
		x += data->params.x_increment;
		y += data->params.y_increment;
	}
	if (size_alignment >= WIN_ALIGNMENT)
	{
		// fprintf(data->fd, "alignment >= %d\n", WIN_ALIGNMENT);
		get_forced_moves(data, save_x, save_y, path, size_path, color,
			ennemy_color, size_alignment, increments);
	}
}

static void	init_increments(signed char increments[4][2])
{
	increments[0][X] = 0;
	increments[0][Y] = 1;
	increments[1][X] = 1;
	increments[1][Y] = 0;
	increments[2][X] = 1;
	increments[2][Y] = 1;
	increments[3][X] = -1;
	increments[3][Y] = 1;
}

static void	check_alignments(t_data *data, int x, int y,
				unsigned char path[PLACES_ON_BOARD][2], int *size_path,
				unsigned char color, unsigned char ennemy_color)
{
	signed char	increments[4][2];

	init_increments(increments);
	init_increment(data, 0, 1);
	check_alignment(data, x, y, path, size_path, color, ennemy_color, increments);
	init_increment(data, 1, 0);
	check_alignment(data, x, y, path, size_path, color, ennemy_color, increments);
	init_increment(data, 1, 1);
	check_alignment(data, x, y, path, size_path, color, ennemy_color, increments);
	init_increment(data, -1, 1);
	check_alignment(data, x, y, path, size_path, color, ennemy_color, increments);
}

void	check_forced_moves(t_data *data, unsigned char path[PLACES_ON_BOARD][2], int *size_path,
			unsigned char color)
{
	int				x;
	int				y;
	unsigned char	ennemy_color;

	if (color == WHITE)
		ennemy_color = BLACK;
	else
		ennemy_color = WHITE;
	y = 0;
	*size_path = 0;
	while (y < SB)
	{
		x = 0;
		while (x < SB)
		{
			if (data->put_stones[y][x] == ennemy_color)
				check_alignments(data, x, y, path, size_path, color, ennemy_color);
			x += 1;
		}
		y += 1;
	}
}
