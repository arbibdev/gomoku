/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   remove_captured_stones.c                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/19 21:36:56 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/19 21:36:57 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

long	remove_captured_stones(t_data *data, unsigned char captured[16][3],
			unsigned char new_captures, unsigned char color,
			unsigned char depth)
{
	int				c;
	long			removed_stones;
	unsigned char	ennemy_color;
	unsigned char	winner;

	if (color == WHITE)
		ennemy_color = BLACK;
	else
		ennemy_color = WHITE;
	winner = data->winner;
	removed_stones = 0;
	c = 0;
	while (c < new_captures)
	{
		removed_stones -= compute_new_stone(data, captured[c][X],
			captured[c][Y], ennemy_color, depth);
		data->put_stones[captured[c][Y]][captured[c][X]] = 0;
		data->factor[captured[c][Y]][captured[c][X]] = 0;
		c += 1;
	}
	data->winner = winner;
	return (removed_stones);
}