/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_start_evaluation.c                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/09 18:43:16 by adauchy           #+#    #+#             */
/*   Updated: 2023/02/09 18:43:18 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void	init_start_evaluation(t_data *data)
{
	int	x;
	int	y;
	int	c;

	y = 0;
	while (y < SB)
	{
		x = 0;
		while (x < SB)
		{
			c = 0;
			while (c < 4)
			{
				data->checked[c][y][x] = 0;
				c += 1;
			}
			x += 1;
		}
		y += 1;
	}
}

static long	evaluate_stones(t_data *data)
{
	int		x;
	int		y;
	long	heuristic;

	y = 0;
	heuristic = 0;
	while (y < SB)
	{
		x = 0;
		while (x < SB)
		{
			if (data->put_stones[y][x])
			{
				data->params.x = x;
				data->params.y = y;
				heuristic += evaluate_stone(data);
			}
			x += 1;
		}
		y += 1;
	}
	return (heuristic);
}

long	get_start_evaluation(t_data *data)
{
	long	heuristic;

	init_start_evaluation(data);
	heuristic = evaluate_stones(data);
	return (heuristic);
}
