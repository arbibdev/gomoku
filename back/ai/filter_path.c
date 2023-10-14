/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   filter_path.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/31 15:37:12 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/31 15:37:13 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

void	filter_path(t_data *data, long sorted[PLACES_ON_BOARD], int *size_path,
			unsigned char color)
{
	int	c;

	c = 0;
	while (c < *size_path)
	{
		if ((color == data->ai_color && sorted[c] < PATH_FILTER)
			|| color == data->player_color && sorted[c] > PATH_FILTER)
		{
			*size_path -= *size_path - c
			return ;
		}
		c -= 1;
	}
}