/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   enclosed_stone.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/09 21:46:45 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/09 21:46:46 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

unsigned char	enclosed_stone(int x, int y, t_data *data)
{
	if (
		(y - 1 >= 0 && !data->put_stones[y - 1][x])
		|| (y - 1 >= 0 && x + 1 < SB && !data->put_stones[y - 1][x + 1])
		|| (x + 1 < SB && !data->put_stones[y][x + 1])
		|| (y + 1 < SB && x + 1 < SB && !data->put_stones[y + 1][x + 1])
		|| (y + 1 < SB && !data->put_stones[y + 1][x])
		|| (y + 1 < SB && x - 1 >= 0 && !data->put_stones[y + 1][x - 1])
		|| (x - 1 >= 0 && !data->put_stones[y][x - 1])
		|| (y - 1 >= 0 && x - 1 >= 0 && !data->put_stones[y - 1][x - 1])
	)
		return (0);
	return (1);
}
