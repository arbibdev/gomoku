/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   aiTools.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/14 00:05:27 by adauchy           #+#    #+#             */
/*   Updated: 2023/01/14 00:05:29 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

long	max(t_eval eval, unsigned char depth, t_data *data, int x, int y)
{
	if (eval.heuristic > eval.best_heuristic)
	{
		// data->pos[depth - 1][X] = x;
		// data->pos[depth - 1][Y] = y;
		// data->pos[depth - 1][2] = eval.heuristic;
		if (depth == DEPTH)
		{
			data->pos_x = x;
			data->pos_y = y;
		}
		return (eval.heuristic);
	}
	return (eval.best_heuristic);
}

long	min(t_eval eval, unsigned char depth, t_data *data, int x, int y)
{
	(void)depth;
	(void)data;
	(void)x;
	(void)y;
	if (eval.heuristic < eval.best_heuristic)
	{
		// data->pos[depth - 1][X] = x;
		// data->pos[depth - 1][Y] = y;
		// data->pos[depth - 1][2] = eval.heuristic;
		return (eval.heuristic);
	}
	return (eval.best_heuristic);
}
