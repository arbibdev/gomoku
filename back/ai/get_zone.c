/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_zone.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/15 14:06:23 by adauchy           #+#    #+#             */
/*   Updated: 2023/01/15 14:06:25 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static unsigned char	no_stones_around(signed char board[SB][SB],
							int x, int y)
{
	if (board[y][x] > 0)
		return (0);
	if (
		(y - 1 >= 0 && board[y - 1][x] > 0)
		||
		(y - 1 >= 0 && x + 1 < SB && board[y - 1][x + 1] > 0)
		||
		(x + 1 < SB && board[y][x + 1] > 0)
		||
		(y + 1 < SB && x + 1 < SB && board[y + 1][x + 1] > 0)
		||
		(y + 1 < SB && board[y + 1][x] > 0)
		||
		(y + 1 < SB && x - 1 >= 0 && board[y + 1][x - 1] > 0)
		||
		(x - 1 >= 0 && board[y][x - 1] > 0)
		||
		(y - 1 >= 0 && x - 1 >= 0 && board[y - 1][x - 1] > 0)
	)
		return (0);
	return (1);
}

static unsigned char	*write_pos(signed char board[SB][SB],
							int c, int x, int y)
{
	unsigned char	*pos;

	pos = malloc(2 * sizeof(unsigned char));
	if (!pos)
		exit(1);
	pos[X] = x;
	pos[Y] = y;
	board[y][x] = c;
	return (pos);
}

static unsigned char	**write_zone(signed char board[SB][SB],
							int size_zone, int c)
{
	unsigned char	**zone;
	int				x;
	int				y;
	int				z;

	zone = malloc((size_zone + 1) * sizeof(unsigned char *));
	if (!zone)
		exit(1);
	y = 0;
	z = 0;
	while (y < SB)
	{
		x = 0;
		while (x < SB)
		{
			if (!board[y][x])
				zone[z++] = write_pos(board, c, x, y);
			else if (board[y][x] == -1)
				board[y][x] = 0;
			x += 1;
		}
		y += 1;
	}
	zone[z] = NULL;
	return (zone);
}

static void	check_around(signed char board[SB][SB], int *x, int y,
				int *size_zone)
{
	if (no_stones_around(board, *x, y))
		board[y][*x] = -1;
	else if (board[y][*x] == 0)
		*size_zone += 1;
	*x += 1;
}

unsigned char	**get_zone(int *ai_path_length,
	signed char board[SB][SB], int c)
{
	int				x;
	int				y;
	int				size_zone;
	unsigned char	**zone;

	y = 0;
	size_zone = 0;
	while (y < SB)
	{
		x = 0;
		while (x < SB)
			check_around(board, &x, y, &size_zone);
		y += 1;
	}
	if (!size_zone)
		return (NULL);
	zone = write_zone(board, size_zone, c);
	shuffle_2d_tab((void **)zone);
	*ai_path_length += size_zone;
	return (zone);
}
