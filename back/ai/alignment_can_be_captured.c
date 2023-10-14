/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   alignment_can_be_captured.c                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/01 19:06:24 by adauchy           #+#    #+#             */
/*   Updated: 2023/04/01 19:06:25 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static signed char	value(t_data *data, int pos[2])
{
	if (pos[X] >= 0 && pos[X] < SB && pos[Y] >= 0 && pos[Y] < SB)
		return (data->put_stones[pos[Y]][pos[X]]);
	return (-1);
}

static	unsigned char	possible_capture(t_data *data,
							unsigned char color, unsigned char ennemy_color,
							int pos[4][2])
{
	if (value(data, pos[0]) == ennemy_color
		&& value(data, pos[1]) == color
		&& value(data, pos[2]) == 0)
		{
			// fprintf(data->fd, "CAPTURE POSSIBLE IN [%d, %d]\n", pos[2][X], pos[2][Y]);
			return (1);
		}
	if (value(data, pos[1]) == ennemy_color
		&& value(data, pos[2]) == color
		&& value(data, pos[3]) == 0)
		{
			// fprintf(data->fd, "CAPTURE POSSIBLE IN [%d, %d]\n", pos[3][X], pos[3][Y]);
			return (1);
		}
	if (value(data, pos[3]) == ennemy_color
		&& value(data, pos[2]) == color
		&& value(data, pos[1]) == 0)
		{
			// fprintf(data->fd, "CAPTURE POSSIBLE IN [%d, %d]\n", pos[1][X], pos[1][Y]);
			return (1);
		}
	if (value(data, pos[2]) == ennemy_color
		&& value(data, pos[1]) == color
		&& value(data, pos[0]) == 0)
		{
			// fprintf(data->fd, "CAPTURE POSSIBLE IN [%d, %d]\n", pos[0][X], pos[0][Y]);
			return (1);
		}
	return (0);
}

static unsigned char	stone_can_be_captured_in_this_dir(t_data *data, int x, int y,
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
	if (possible_capture(data, color, ennemy_color, pos))
		return (1);
	return (0);
}

static void	init_increments(signed char increments[4][2])
{
	increments[0][X] = 0;
	increments[0][Y] = -1;
	increments[1][X] = 1;
	increments[1][Y] = -1;
	increments[2][X] = 1;
	increments[2][Y] = 0;
	increments[3][X] = 1;
	increments[3][Y] = 1;
}

static unsigned char	stone_can_be_captured(t_data *data, int x, int y,
							unsigned char color, unsigned char ennemy_color)
{
	signed char	increments[4][2];
	int			c;

	init_increments(increments);
	c = 0;
	while (c < 4)
	{
		if (!(data->params.x_increment == increments[c][X]
		&& data->params.y_increment == increments[c][Y]))
		{
			if (stone_can_be_captured_in_this_dir(data, x, y, color,
			ennemy_color, increments[c]))
				return (1);
		}
		c += 1;
	}
	return (0);
}

unsigned char	alignment_can_be_captured(t_data *data, unsigned char size_alignment, int x, int y)
{
	unsigned char	color;
	unsigned char	ennemy_color;
	int				c;

	c = 0;
	color = data->put_stones[y][x];
	if (color == WHITE)
		ennemy_color = BLACK;
	else
		ennemy_color = WHITE;
	while (c < size_alignment)
	{
		if (stone_can_be_captured(data, x, y, color, ennemy_color))
			return (1);
		x -= data->params.x_increment;
		y -= data->params.y_increment;
		c += 1;
	}
	return (0);
}