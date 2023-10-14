/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   recover_captured_stones.c                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/19 21:39:30 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/19 21:39:31 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

void	recover_captured_stones(t_data *data, unsigned char captured[16][3],
			unsigned char new_captures, unsigned char color)
{
	int				c;
	unsigned char	ennemy_color;

	if (color == WHITE)
		ennemy_color = BLACK;
	else
		ennemy_color = WHITE;
	c = 0;
	while (c < new_captures)
	{
		data->put_stones[captured[c][Y]][captured[c][X]] = ennemy_color;
		data->factor[captured[c][Y]][captured[c][X]] = captured[c][FACTOR];
		c += 1;
	}
}