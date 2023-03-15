/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/13 19:12:03 by adauchy           #+#    #+#             */
/*   Updated: 2023/01/13 19:14:13 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

int	main(int ac, char **av)
{
	t_data			data;
	t_pruning		pruning;

	(void)ac;
	init_data(&data, (unsigned char **)av);
	pruning.alpha = INT_MIN;
	pruning.beta = INT_MAX;
	minmax(DEPTH, pruning, &data);
	printf("%d %d\n", data.pos_x, data.pos_y);
	free_2d_tab((void **)data.ai_path);
	return (0);
}
