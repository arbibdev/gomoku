/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_path.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/26 13:48:39 by adauchy           #+#    #+#             */
/*   Updated: 2023/03/26 13:48:44 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void	write_ai_path(t_data *data, unsigned char **zones[TREATMENT_SPACE])
{
	int	i;
	int	j;
	int	k;

	i = 0;
	k = 0;
	while (zones[i])
	{
		j = 0;
		while (zones[i][j])
		{
			data->path[k] = zones[i][j];
			j += 1;
			k += 1;
		}
		i += 1;
	}
}

static void	free_data(unsigned char **zones[TREATMENT_SPACE])
{
	int	c;

	c = 0;
	while (zones[c])
	{
		free(zones[c]);
		c += 1;
	}
}

static void	init_buffer(signed char buffer[SB][SB], unsigned char board[SB][SB])
{
	int	x;
	int	y;

	y = 0;
	while (y < SB)
	{
		x = 0;
		while (x < SB)
		{
			buffer[y][x] = board[y][x];
			x += 1;
		}
		y += 1;
	}
}

void	get_path_last(t_data *data)
{
	int				c;
	int				ai_path_length;
	unsigned char	**zones[TREATMENT_SPACE + 1];
	signed char		buffer[SB][SB];

	init_buffer(buffer, data->put_stones);
	zones[TREATMENT_SPACE] = NULL;
	ai_path_length = 0;
	c = 0;
	while (c < TREATMENT_SPACE)
	{
		zones[c] = get_zone(&ai_path_length, buffer, c + 3);
		if (!zones[c])
			break ;
		c += 1;
	}
	if (!ai_path_length)
		return ;
	data->path = malloc((ai_path_length + 1) * sizeof(unsigned char *));
	if (!data->path)
		exit(1);
	data->path[ai_path_length] = NULL;
	write_ai_path(data, zones);
	free_data(zones);
}
