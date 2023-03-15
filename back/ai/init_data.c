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

static void	init_ai_path(t_data *data)
{
	data->ai_path = NULL;
	get_ai_path(data);
	if (!data->ai_path)
	{
		data->ai_path = malloc(2 * sizeof(unsigned char *));
		if (!data->ai_path)
			exit(1);
		data->ai_path[0] = malloc(2 * sizeof(unsigned char));
		if (!data->ai_path[0])
			exit(1);
		data->ai_path[0][X] = 9;
		data->ai_path[0][Y] = 9;
		data->ai_path[1] = NULL;
	}
}

void	init_data(t_data *data, unsigned char **av)
{
	data->ai_color = av[1][0] - 48;
	if (data->ai_color == WHITE)
		data->player_color = BLACK;
	else
		data->player_color = WHITE;
	init_boards(&(av[2]), data);
	init_ai_path(data);
	data->heuristic = 0;
	data->winner = 0;
	data->params.set_winner = 0;
	data->heuristic = get_start_evaluation(data);
}
