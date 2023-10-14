/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_alignment_value.c                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/31 22:48:16 by adauchy           #+#    #+#             */
/*   Updated: 2023/01/31 22:48:18 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

// int	get_alignment_value(unsigned char size_alignment,
// 	unsigned char neighbours[2],
// 	unsigned char color, t_data *data)
// {
// 	int	heuristic;

// 	if (size_alignment > 1)
// 	{
// 		if (size_alignment < 5 && neighbours[0] && neighbours[1])
// 			return (0);
// 		if (data->params.set_winner && size_alignment >= 5)
// 			data->winner = 1;
// 		if (size_alignment > 8)
// 			size_alignment = 8;
// 		heuristic = pow(10, size_alignment)
// 			* (1 + (1 - neighbours[0]) + (1 - neighbours[1]));
// 		if (color == data->ai_color)
// 			return (heuristic);
// 		return (-heuristic);
// 	}
// 	return (0);
// }

// int	get_alignment_value(unsigned char size_alignment,
// 	unsigned char neighbours[2],
// 	unsigned char color, t_data *data)
// {
// 	int	heuristic;

// 	if (size_alignment > 1)
// 	{
// 		if (size_alignment >= 5)
// 		{
// 			if (data->params.set_winner)
// 				data->winner = 1;
// 			if (color == data->ai_color)
// 				return (500000);
// 			return (-500000);
// 		}
// 		if (neighbours[0] && neighbours[1])
// 			return (0);
// 		heuristic = pow(10, size_alignment)
// 			* (1 + (1 - neighbours[0]) + (1 - neighbours[1]));
// 		if (color == data->ai_color)
// 			return (heuristic);
// 		return (-heuristic);
// 	}
// 	return (0);
// }


long	get_alignment_value(unsigned char size_alignment,
	unsigned char neighbours[2],
	unsigned char color, t_data *data)
{
	long	heuristic;

	if (size_alignment > 1)
	{
		if (size_alignment < 5 && neighbours[0] && neighbours[1])
			return (0);
		if (data->params.set_winner && size_alignment >= 5)
			data->winner = 1;
		heuristic = my_pow(BASE_ALIGNMENT, size_alignment)
			* (1 + (1 - neighbours[0]) + (1 - neighbours[1]));
		if (color == data->ai_color)
			return (heuristic);
		return (-heuristic);
	}
	return (0);
}