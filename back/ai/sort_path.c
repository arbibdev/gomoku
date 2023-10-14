/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sort_path.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/28 22:12:46 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/28 22:12:48 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void insert(long new_stone, unsigned char path[PLACES_ON_BOARD][2],
				long sorted[PLACES_ON_BOARD], int pos, int place)
{
	unsigned char	to_insert[2];
	int 			c;

	
	to_insert[X] = path[pos][X];
	to_insert[Y] = path[pos][Y];
	c = pos;
	while (c > place)
	{
		path[c][X] = path[c - 1][X];
		path[c][Y] = path[c - 1][Y];
		sorted[c] = sorted[c - 1];
		c -= 1;
	}
	path[c][X] = to_insert[X];
	path[c][Y] = to_insert[Y];
	sorted[c] = new_stone;
}

static void	sort_move(t_data *data, long new_stone, unsigned char path[PLACES_ON_BOARD][2],
				long sorted[PLACES_ON_BOARD], int pos, unsigned char color)
{
	int	c;

	c = 0;
	while (c < pos)
	{
		if (color == data->ai_color && new_stone > sorted[c])
			break ;
		if (color == data->player_color && new_stone < sorted[c])
			break ;
		c += 1;
	}
	insert(new_stone, path, sorted, pos, c);
}

// static void	print_sorted(t_data *data, long sorted[PLACES_ON_BOARD], int size_path)
// {
// 	int	c;

// 	c = 0;
// 	while (c < size_path)
// 	{
// 		fprintf(data->fd, "%ld ", sorted[c]);
// 		c += 1;
// 	}
// 	fprintf(data->fd, "\n");
// }

// static void	print_path(t_data *data, unsigned char path[PLACES_ON_BOARD][2], int size_path)
// {
// 	int	c;

// 	c = 0;
// 	while (c < size_path)
// 	{
// 		fprintf(data->fd, "[%d, %d]", path[c][X], path[c][Y]);
// 		c += 1;
// 	}
// 	fprintf(data->fd, "\n");
// }

// void	print_mean(t_data *data, long sorted[PLACES_ON_BOARD], int size_path)
// {
// 	long	sum;
// 	int		c;

// 	sum = 0;
// 	c = 0;
// 	while (c < size_path)
// 	{
// 		sum += sorted[c];
// 		c += 1;
// 	}
// 	fprintf(data->fd, "mean => %ld\n", sum / size_path);
// }

void	sort_path(t_data *data, unsigned char path[PLACES_ON_BOARD][2], int *size_path,
			unsigned char color, unsigned char depth)
{
	int				c;
	unsigned char	new_captures;
	long			sorted[PLACES_ON_BOARD];
	long			new_stone;
	unsigned char	captured[16][3];
	int				x;
	int				y;

	c = 0;
	while (c < *size_path)
	{
		x = path[c][X];
		y = path[c][Y];
		data->put_stones[y][x] = color;
		data->factor[y][x] = data->params.depth;
		new_captures = compute_captures(data, captured, color);
		new_stone = compute_new_stone(data, x,
				y, color, depth) + 
			remove_captured_stones(data, captured, new_captures, color, depth);
		if (color == data->ai_color)
			new_stone += my_pow(BASE_ALIGNMENT, (new_captures / 2));
		else
			new_stone -= my_pow(BASE_ALIGNMENT, (new_captures / 2));
		sort_move(data, new_stone, path, sorted, c, color);
		recover_captured_stones(data, captured, new_captures, color);
		data->put_stones[y][x] = 0;
		data->factor[y][x] = 0;
		c += 1;
	}
	// filter_path(data, sorted, size_path, color);
	// print_path(data, path, *size_path);
	// print_sorted(data, sorted, *size_path);
	// print_mean(data, sorted, *size_path);
}