/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   minmax.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/13 21:24:17 by adauchy           #+#    #+#             */
/*   Updated: 2023/01/13 21:24:19 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gomoku.h"

static void	print_put_stones(t_data *data)
{
	int	x;
	int	y;

	y = 0;
	while (y < SB)
	{
		x = 0;
		while (x < SB)
		{
			if (data->put_stones[y][x])
				fprintf(data->fd, "%d ", data->put_stones[y][x]);
			else
				fprintf(data->fd, ". ");
			x += 1;
		}
		fprintf(data->fd, " ");
		x = 0;
		while (x < SB)
		{
			if (data->factor[y][x])
				fprintf(data->fd, "%d ", data->factor[y][x]);
			else
				fprintf(data->fd, ". ");
			x += 1;
		}
		fprintf(data->fd, "\n");
		y += 1;
	}
}

// static unsigned char	path_here(int x, int y, unsigned char path[PLACES_ON_BOARD][2], int size_path)
// {
// 	int	c;

// 	c = 0;
// 	while (c < size_path)
// 	{
// 		if (path[c][X] == x && path[c][Y] == y)
// 			return (1);
// 		c += 1;
// 	}
// 	return (0);
// }

// static void	print_path(t_data *data, unsigned char path[PLACES_ON_BOARD][2], int size_path)
// {
// 	int	x;
// 	int	y;

// 	y = 0;
// 	while (y < SB)
// 	{
// 		x = 0;
// 		while (x < SB)
// 		{

// 			if (path_here(x, y, path, size_path))
// 				fprintf(data->fd, ". ");
// 			else if (!data->put_stones[y][x])
// 				fprintf(data->fd, "o ");
// 			else
// 				fprintf(data->fd, "%d ", data->put_stones[y][x]);
// 			x += 1;
// 		}
// 		fprintf(data->fd, "\n");
// 		y += 1;
// 	}
// }

// static void	print_path2(t_data *data, unsigned char path[PLACES_ON_BOARD][2], int size_path)
// {
// 	int	c;

// 	c = 0;
// 	while (c < size_path)
// 	{
// 		fprintf(data->fd, "[%d, %d]", path[c][X], path[c][Y]);
// 		c += 1;
// 	}
// 	fprintf(data->fd, "\n");
// }

static void	compute(t_data *data, unsigned char depth, t_eval *eval,
				t_pruning pruning, t_node *node)
{
	unsigned char	new_captures;
	long			new_stone;
	int				x_path;
	int				y_path;
	unsigned char	color;
	unsigned char	captured[16][3];

	color = data->params.color;
	x_path = data->params.x_path;
	y_path = data->params.y_path;
	data->put_stones[y_path][x_path]
		= color;
	data->factor[y_path][x_path] = depth;
	new_captures = compute_captures(data, captured, color);
	data->captures[color] += new_captures;
	new_stone = compute_new_stone(data, x_path,
			y_path, color, depth) + 
		remove_captured_stones(data, captured, new_captures, color, depth);
	data->heuristic += new_stone;
	node->x = x_path;
	node->y = y_path;
	eval->heuristic = minmax(depth - 1, pruning, data, node);
	data->heuristic -= new_stone;
	data->captures[color] -= new_captures;
	recover_captured_stones(data, captured, new_captures, color);
	data->put_stones[y_path][x_path] = 0;
	data->factor[y_path][x_path] = 0;
}

static long	get_ennemy_heuristic(unsigned char depth, t_pruning pruning,
				t_data *data, t_node *node)
{
	int				c;
	t_eval			eval;
	unsigned char	path[361][2];
	int				size_path;

	eval.best_heuristic = LONG_MAX;
	c = 0;
	data->params.depth = depth;
	// fprintf(data->fd, "get_ennemy_heuristic\n");
	// print_put_stones(data);
	get_path(data, path, &size_path, data->player_color, depth);
	// print_path(data, path, size_path);
	while (c < size_path)
	{
		if (!c)
		{
			node->child = malloc(sizeof(t_node));
			node = node->child;
		}
		else
		{
			node->brother = malloc(sizeof(t_node));
			node = node->brother;
		}
		node->brother = NULL;
		data->params.color = data->player_color;
		data->params.x_path = path[c][X];
		data->params.y_path = path[c][Y];
		compute(data, depth, &eval, pruning, node);
		eval.best_heuristic = min(eval, depth, data, path[c][X], path[c][Y]);
		if (eval.heuristic < pruning.beta)
		{
			pruning.beta = eval.heuristic;
			if (pruning.beta <= pruning.alpha)
				break ;
		}
		c += 1;
	}
	return (eval.best_heuristic);
}

static long	get_ai_heuristic(unsigned char depth, t_pruning pruning,
				t_data *data, t_node *node)
{
	int				c;
	t_eval			eval;
	unsigned char	path[PLACES_ON_BOARD][2];
	int				size_path;

	eval.best_heuristic = LONG_MIN;
	c = 0;
	data->params.depth = depth;
	// fprintf(data->fd, "get_ai_heuristic\n");
	// print_put_stones(data);
	get_path(data, path, &size_path, data->ai_color, depth);
	// print_path(data, path, size_path);
	while (c < size_path)
	{
		if (!c)
		{
			node->child = malloc(sizeof(t_node));
			node = node->child;
		}
		else
		{
			node->brother = malloc(sizeof(t_node));
			node = node->brother;
		}
		node->brother = NULL;
		data->params.color = data->ai_color;
		data->params.x_path = path[c][X];
		data->params.y_path = path[c][Y];
		compute(data, depth, &eval, pruning, node);
		eval.best_heuristic = max(eval, depth, data, path[c][X], path[c][Y]);
		if (eval.heuristic > pruning.alpha)
		{
			pruning.alpha = eval.heuristic;
			if (pruning.beta <= pruning.alpha)
				break ;
		}
		c += 1;
	}
	return (eval.best_heuristic);
}

long	minmax(unsigned char depth, t_pruning pruning, t_data *data, t_node *node)
{
	long	heuristic;
	long	start_evaluation;

	data->params.set_winner = 0;
	start_evaluation = get_start_evaluation(data);
	// print_put_stones(data);
	// fprintf(data->fd, "%ld %ld\n", start_evaluation, data->heuristic);
	if (start_evaluation != data->heuristic)
	{
		fprintf(data->fd, "ERROR %ld %ld : \n", start_evaluation, data->heuristic);
		print_put_stones(data);
		exit(0);
	}
	if (depth == 0 || data->winner || data->captures[BLACK] >= 10 || data->captures[WHITE] >= 10)
	{
		heuristic = data->heuristic;
		heuristic += my_pow(BASE_ALIGNMENT, (data->captures[data->ai_color] / 2));
		heuristic -= my_pow(BASE_ALIGNMENT, (data->captures[data->player_color] / 2));
	}
	else if (depth % 2 == DEPTH % 2)
		heuristic = get_ai_heuristic(depth, pruning, data, node);
	else
		heuristic = get_ennemy_heuristic(depth, pruning, data, node);
	node->heuristic = heuristic;
	return (heuristic);
}
