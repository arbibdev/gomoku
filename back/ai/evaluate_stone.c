/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   evaluate_stone.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/06 18:45:25 by adauchy           #+#    #+#             */
/*   Updated: 2023/02/06 18:45:27 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

int	evaluate_stone(t_data *data)
{
	int	heuristic;

	heuristic = 0;
	init_params(data, 1, 0);
	heuristic += compute_alignment(data, HORIZONTAL);
	init_params(data, 1, 1);
	heuristic += compute_alignment(data, DIAGONAL1);
	init_params(data, 0, 1);
	heuristic += compute_alignment(data, VERTICAL);
	init_params(data, -1, 1);
	heuristic += compute_alignment(data, DIAGONAL2);
	heuristic += compute_single_stone(data->params.x, data->params.y, data)
		* data->factor[data->params.y][data->params.x];
	return (heuristic);
}
