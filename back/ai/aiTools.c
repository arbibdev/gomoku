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

int	max(t_eval eval, unsigned char depth, t_data *data, int c)
{
	if (eval.heuristic > eval.best_heuristic)
	{
		if (depth == DEPTH)
		{
			data->pos_x = data->ai_path[c][X];
			data->pos_y = data->ai_path[c][Y];
		}
		return (eval.heuristic);
	}
	return (eval.best_heuristic);
}

int	min(t_eval eval)
{
	if (eval.heuristic < eval.best_heuristic)
		return (eval.heuristic);
	return (eval.best_heuristic);
}
