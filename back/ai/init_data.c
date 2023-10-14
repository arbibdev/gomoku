/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   init_data.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/14 21:14:31 by adauchy           #+#    #+#             */
/*   Updated: 2023/01/14 21:14:44 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void	init_boards(unsigned char **board, t_data *data)
{
	int	x;
	int	y;

	y = 0;
	while (y < SB)
	{
		x = 0;
		while (x < SB)
		{
			data->put_stones[y][x] = board[y][x] - 48;
			if (data->put_stones[y][x])
				data->factor[y][x] = DEPTH + 1;
			else
				data->factor[y][x] = 0;
			x += 1;
		}
		y += 1;
	}
}

// static void	init_path(t_data *data)
// {
// 	data->path = NULL;
// 	get_path_last(data);
// 	if (!data->path)
// 	{
// 		data->path = malloc(2 * sizeof(unsigned char *));
// 		if (!data->path)
// 			exit(1);
// 		data->path[0] = malloc(2 * sizeof(unsigned char));
// 		if (!data->path[0])
// 			exit(1);
// 		data->path[0][X] = 9;
// 		data->path[0][Y] = 9;
// 		data->path[1] = NULL;
// 	}
// }

void	init_data(t_data *data, unsigned char **av)
{
	data->ai_color = ft_atoi((char *)av[1]);
	if (data->ai_color == WHITE)
		data->player_color = BLACK;
	else
		data->player_color = WHITE;
	data->captures[BLACK] = ft_atoi((char *)av[2]);
	data->captures[WHITE] = ft_atoi((char *)av[3]);
	init_boards(&(av[4]), data);
	// init_path(data);
	data->winner = 0;
	data->params.set_winner = 0;
	data->heuristic = get_start_evaluation(data);
}
