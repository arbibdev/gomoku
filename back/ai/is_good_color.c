/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   is_good_color.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/15 22:42:54 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/15 22:42:58 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

unsigned char	is_good_color(t_data *data, unsigned char color, int x, int y)
{
	if (!(x >= 0 && x < SB && y >= 0 && y < SB)
		|| data->put_stones[y][x] != color)
	{
		data->params.x -= data->params.x_increment;
		data->params.y -= data->params.y_increment;
		return (0);
	}
	return (1);
}
