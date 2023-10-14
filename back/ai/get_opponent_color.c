/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_opponent_color.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/15 17:58:35 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/15 17:58:36 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

unsigned char	get_opponent_color(t_data *data, unsigned char color)
{
	if (color == data->ai_color)
		return (data->player_color);
	return (data->ai_color);
}
