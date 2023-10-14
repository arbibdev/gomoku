/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   compute_single_stone.c                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/08 18:25:42 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/08 18:25:43 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void	check_neighbour(t_data *data, int x, int y,
				unsigned char *free_neighbours)
{
	if (x >= 0 && x < SB && y >= 0 && y < SB
		&& !data->put_stones[y][x])
		*free_neighbours += 1;
}

static unsigned char	get_free_neighbours(t_data *data, int x, int y)
{
	unsigned char	free_neighbours;

	free_neighbours = 0;
	check_neighbour(data, x, y - 1, &free_neighbours);
	check_neighbour(data, x + 1, y - 1, &free_neighbours);
	check_neighbour(data, x + 1, y, &free_neighbours);
	check_neighbour(data, x + 1, y + 1, &free_neighbours);
	check_neighbour(data, x, y + 1, &free_neighbours);
	check_neighbour(data, x - 1, y + 1, &free_neighbours);
	check_neighbour(data, x - 1, y, &free_neighbours);
	check_neighbour(data, x - 1, y - 1, &free_neighbours);
	return (free_neighbours);
}

int	compute_single_stone(int x, int y, t_data *data)
{
	int				heuristic;
	unsigned char	free_neighbours;

	free_neighbours = get_free_neighbours(data, x, y);
	heuristic = SINGLE_STONE * (free_neighbours + 1);
	if (heuristic > SINGLE_STONE)
	{
		if (data->put_stones[y][x] == data->player_color)
			return (-heuristic);
		return (heuristic);
	}
	return (0);
}
