/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   compute_new_alignment.c                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/14 17:40:24 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/14 17:40:25 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

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

static void	go_to_start_alignment(t_data *data, unsigned char color,
				int *x, int *y)
{
	while (*x >= 0 && *x < SB && *y >= 0 && *y < SB
		&& data->put_stones[*y][*x] == color)
	{
		*x += data->params.x_increment;
		*y += data->params.y_increment;
	}
}

static void	get_neighbour(t_data *data, int x, int y,
				unsigned char *neighbour)
{
	*neighbour = 1;
	if (x >= 0 && x < SB && y >= 0 && y < SB && !data->put_stones[y][x])
		*neighbour = 0;
}

long	compute_new_alignment(t_data *data, unsigned char color,
			unsigned char depth)
{
	unsigned char	neighbour[2];
	unsigned char	size_alignment;
	int				x;
	int				y;
	unsigned char	factor;
	int				save_x;
	int				save_y;

	x = data->params.x;
	y = data->params.y;
	go_to_start_alignment(data, color, &x, &y);
	get_neighbour(data, x, y, &neighbour[0]);
	x -= data->params.x_increment;
	y -= data->params.y_increment;
	save_x = x;
	save_y = y;
	size_alignment = 0;
	// factor = data->factor[y][x];
	factor = 0;
	while (x >= 0 && x < SB && y >= 0 && y < SB
		&& data->put_stones[y][x] == color)
	{
		// if (data->factor[y][x] < factor)
			// factor = data->factor[y][x];
		factor += data->factor[y][x];
		size_alignment += 1;
		x -= data->params.x_increment;
		y -= data->params.y_increment;
	}
	if (size_alignment == 1)
		return (0);
	get_neighbour(data, x, y, &neighbour[1]);
	if (size_alignment >= WIN_ALIGNMENT && alignment_can_be_captured(data, size_alignment, save_x, save_y))
	{
		(void)depth;
		// fprintf(data->fd, "%s alignment can be captured in depth %d : \n", color == WHITE ? "white" : "black", depth);
		// print_put_stones(data);
		data->params.set_winner = 0;
	}
	return (get_alignment_value(size_alignment, neighbour, color, data)
		* factor);
}
