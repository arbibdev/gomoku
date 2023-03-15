/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   minmax.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/13 21:24:17 by adauchy           #+#    #+#             */
/*   Updated: 2023/01/13 21:24:19 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void	compute(t_data *data, unsigned char depth, t_eval *eval,
				t_pruning pruning)
{
	int	new_stone;
	int	c;

	c = data->params.c;
	data->put_stones[data->ai_path[c][Y]][data->ai_path[c][X]]
		= data->params.color;
	data->factor[data->ai_path[c][Y]][data->ai_path[c][X]] = depth;
	new_stone = compute_new_stone(data, data->ai_path[c][X],
			data->ai_path[c][Y], data->params.color);
	data->heuristic += new_stone;
	eval->heuristic = minmax(depth - 1, pruning, data);
	data->heuristic -= new_stone;
	data->put_stones[data->ai_path[c][Y]][data->ai_path[c][X]] = 0;
	data->factor[data->ai_path[c][Y]][data->ai_path[c][X]] = 0;
}

static int	get_ennemy_heuristic(unsigned char depth, t_pruning pruning,
				t_data *data)
{
	int		c;
	t_eval	eval;

	eval.best_heuristic = INT_MAX;
	c = 0;
	while (data->ai_path[c])
	{
		if (!data->put_stones[data->ai_path[c][Y]][data->ai_path[c][X]])
		{
			data->params.c = c;
			data->params.color = data->player_color;
			compute(data, depth, &eval, pruning);
			eval.best_heuristic = min(eval);
			if (eval.heuristic < pruning.beta)
			{
				pruning.beta = eval.heuristic;
				if (pruning.beta <= pruning.alpha)
					break ;
			}
		}
		c += 1;
	}
	return (eval.best_heuristic);
}

static int	get_ai_heuristic(unsigned char depth, t_pruning pruning,
				t_data *data)
{
	int		c;
	t_eval	eval;

	eval.best_heuristic = INT_MIN;
	c = 0;
	while (data->ai_path[c])
	{
		if (!data->put_stones[data->ai_path[c][Y]][data->ai_path[c][X]])
		{
			data->params.c = c;
			data->params.color = data->ai_color;
			compute(data, depth, &eval, pruning);
			eval.best_heuristic = max(eval, depth, data, c);
			if (eval.heuristic > pruning.alpha)
			{
				pruning.alpha = eval.heuristic;
				if (pruning.beta <= pruning.alpha)
					break ;
			}
		}
		c += 1;
	}
	return (eval.best_heuristic);
}

int	minmax(unsigned char depth, t_pruning pruning, t_data *data)
{
	int				heuristic;

	if (depth == 0 || data->winner)
		heuristic = data->heuristic;
	else if (depth % 2 == DEPTH % 2)
		heuristic = get_ai_heuristic(depth, pruning, data);
	else
		heuristic = get_ennemy_heuristic(depth, pruning, data);
	return (heuristic);
}
