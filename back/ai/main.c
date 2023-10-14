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

static void	print_final_pos(t_data *data, t_node *tree, long final_heuristic)
{
	int	c;

	c = 0;
	tree = tree->child;
	while (c < DEPTH)
	{
		while (tree && tree->heuristic != final_heuristic)
		{
			fprintf(data->fd, "%ld ", tree->heuristic);
			tree = tree->brother;
		}
		fprintf(data->fd, "\n");
		if (tree)
		{
			fprintf(data->fd, "%d => [%d, %d] : %ld\n", c + 1, tree->x, tree->y, tree->heuristic);
			tree = tree->child;
		}
		c += 1;
	}
}

int	main(int ac, char **av)
{
	t_data			data;
	t_pruning		pruning;
	long			final_heuristic;
	t_node			tree;

	(void)ac;
	data.fd = fopen("output.txt", "w");
	init_data(&data, (unsigned char **)av);
	pruning.alpha = LONG_MIN;
	pruning.beta = LONG_MAX;
	final_heuristic = minmax(DEPTH, pruning, &data, &tree);
	printf("%d %d\n", data.pos_x, data.pos_y);
	print_final_pos(&data, &tree, final_heuristic);
	// printf("0 0\n");
	// free_2d_tab((void **)data.path);
	fclose(data.fd);
	return (0);
}
