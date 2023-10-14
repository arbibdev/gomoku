/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   compute_prev_aignment.c                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/14 13:19:08 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/14 13:19:09 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

long	compute_prev_alignment(t_data *data, unsigned char color)
{
	unsigned char	neighbour[2];
	unsigned char	size_alignment;
	unsigned char	factor;

	data->params.x += data->params.x_increment;
	data->params.y += data->params.y_increment;
	if (!is_good_color(data, color, data->params.x, data->params.y))
		return (0);
	neighbour[0] = 0;
	size_alignment = get_size_alignment(data, &factor, &neighbour[1], color);
	data->params.x -= data->params.x_increment;
	data->params.y -= data->params.y_increment;
	return (get_alignment_value(size_alignment, neighbour,
			color, data) * factor);
}
