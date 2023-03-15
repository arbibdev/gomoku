/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   gomoku.h                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/13 21:12:12 by adauchy           #+#    #+#             */
/*   Updated: 2023/01/13 21:12:14 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef GOMOKU_H
# define GOMOKU_H

# include <stdio.h>
# include <limits.h>
# include <stdlib.h>
# include <math.h>

# define DEPTH	3
# define TREATMENT_SPACE    3

# define SB 19 // Size of Board

# define X			0
# define Y			1

# define WHITE	1
# define BLACK	2

# define VERTICAL		0
# define HORIZONTAL		1
# define DIAGONAL1		2
# define DIAGONAL2		3

typedef struct params
{
	int				x;
	int				y;
	signed char		x_increment;
	signed char		y_increment;
	int				c;
	unsigned char	color;
	unsigned char	set_winner;
}	t_params;

typedef struct data
{
	unsigned char	ai_color;
	unsigned char	player_color;
	unsigned char	**ai_path;
	unsigned char	pos_x;
	unsigned char	pos_y;
	unsigned char	checked[4][SB][SB];
	unsigned char	put_stones[SB][SB];
	unsigned char	winner;
	int				heuristic;
	unsigned char	factor[SB][SB];
	t_params		params;
}	t_data;

typedef struct pruning
{
	int		alpha;
	int		beta;
}	t_pruning;

typedef struct eval
{
	int		heuristic;
	int		best_heuristic;
}	t_eval;

void			init_data(t_data *data, unsigned char **av);

void			get_ai_path(t_data *data);

unsigned char	**get_zone(int *ai_path_length,
					signed char board[SB][SB], int c);

int				minmax(unsigned char depth, t_pruning pruning, t_data *data);

int				max(t_eval eval, unsigned char depth, t_data *data, int c);

int				min(t_eval eval);

int				get_alignment_value(unsigned char size_alignment,
					unsigned char neighbours[2],
					unsigned char color, t_data *data);

int				evaluate_stone(t_data *data);

int				get_start_evaluation(t_data *data);

void			free_2d_tab(void **tab);
void			shuffle_2d_tab(void **tab);
int				random_int(int range);
int				length_2d_tab(void **tab);

int				compute_single_stone(int x, int y, t_data *data);

int				compute_new_stone(t_data *data, int x, int y,
					unsigned char color);

unsigned char	enclosed_stone(int x, int y, t_data *data);

int				compute_alignment(t_data *data, unsigned char direction);

int				compute_prev_alignment(t_data *data);

unsigned char	get_size_alignment(t_data *data, unsigned char *factor,
					unsigned char *neighbour, unsigned char color);

int				compute_new_alignment(t_data *data, unsigned char color);

int				compute_new_opponent_alignments(t_data *data, int x, int y,
					unsigned char color);

void			init_params(t_data *data, signed char x_increment,
					signed char y_increment);

#endif