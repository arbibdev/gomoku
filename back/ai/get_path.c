/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_path.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/26 18:25:00 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/26 18:25:02 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void	create_single_stone_path(t_data *data, unsigned char path[PLACES_ON_BOARD][2],
			int *size_path)
{
	if (!data->put_stones[9][9])
	{
		path[0][X] = 9;
		path[0][Y] = 9;
		*size_path = 1;
	}
}

static void	swap(unsigned char path[PLACES_ON_BOARD][2], int a, int b)
{
	unsigned char	save[2];

	save[X] = path[a][X];
	save[Y] = path[a][Y];
	path[a][X] = path[b][X];
	path[a][Y] = path[b][Y];
	path[b][X] = save[X];
	path[b][Y] = save[Y];
}

static void	shuffle_path(unsigned char path[PLACES_ON_BOARD][2], int size_path)
{
	int		c;

	c = 0;
	while (c < size_path - 1)
	{
		swap(path, c, random_int(size_path - c) + c);
		c += 1;
	}
}

// static void	print_put_stones(t_data *data)
// {
// 	int	x;
// 	int	y;

// 	y = 0;
// 	while (y < SB)
// 	{
// 		x = 0;
// 		while (x < SB)
// 		{
// 			if (data->put_stones[y][x])
// 				fprintf(data->fd, "%d ", data->put_stones[y][x]);
// 			else
// 				fprintf(data->fd, ". ");
// 			x += 1;
// 		}
// 		fprintf(data->fd, " ");
// 		x = 0;
// 		while (x < SB)
// 		{
// 			if (data->factor[y][x])
// 				fprintf(data->fd, "%d ", data->factor[y][x]);
// 			else
// 				fprintf(data->fd, ". ");
// 			x += 1;
// 		}
// 		fprintf(data->fd, "\n");
// 		y += 1;
// 	}
// }

// static void	print_forced_moves(t_data *data, unsigned char path[PLACES_ON_BOARD][2], int size_path,
// 				unsigned char color, unsigned char depth)
// {
// 	int	c;

	
// 	fprintf(data->fd, "%d FORCED MOVES for %s in depth %d:\n", size_path, color == BLACK ? "black" : "white", depth);
// 	c = 0;
// 	while (c < size_path)
// 	{
// 		fprintf(data->fd, "[%d, %d] ", path[c][X], path[c][Y]);
// 		c += 1;
// 	}
// 	fprintf(data->fd, "\n");
// 	print_put_stones(data);
// }

void	get_path(t_data *data, unsigned char path[PLACES_ON_BOARD][2], int *size_path,
			unsigned char color, unsigned char depth)
{
	check_forced_moves(data, path, size_path, color);
	if (*size_path)
	{
		// print_forced_moves(data, path, *size_path, color, depth);
		return ;
	}
	create_path(data, path, size_path);
	if (*size_path > 1)
	{
		shuffle_path(path, *size_path);
		sort_path(data, path, size_path, color, depth);
	}
	if (!*size_path){
		create_single_stone_path(data, path, size_path);
		return ;
	}
}