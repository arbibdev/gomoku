/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   init_params.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/14 21:03:23 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/14 21:03:24 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

void	init_increment(t_data *data, signed char x_increment,
			signed char y_increment)
{
	data->params.x_increment = x_increment;
	data->params.y_increment = y_increment;
}
