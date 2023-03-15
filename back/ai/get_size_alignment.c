/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_size_alignment.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/14 17:31:02 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/14 17:31:03 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

unsigned char	get_size_alignment(t_data *data, unsigned char *factor,
					unsigned char *neighbour, unsigned char color)
{
	int				x;
	int				y;
	unsigned char	size_alignment;

	x = data->params.x;
	y = data->params.y;
	*factor = data->factor[y][x];
	size_alignment = 0;
	while (x >= 0 && x < SB && y >= 0 && y < SB
		&& data->put_stones[y][x] == color)
	{
		if (data->factor[y][x] < *factor)
			*factor = data->factor[y][x];
		size_alignment += 1;
		x += data->params.x_increment;
		y += data->params.y_increment;
	}
	*neighbour = 1;
	if (x >= 0 && x < SB && y >= 0 && y < SB
		&& !data->put_stones[y][x])
		*neighbour = 0;
	return (size_alignment);
}
