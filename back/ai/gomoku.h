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

# define DEPTH	4
# define TREATMENT_SPACE    1

# define BASE_ALIGNMENT	100
# define SINGLE_STONE	10

# define WIN_ALIGNMENT	5

# define SB 19 // Size of Board

# define PLACES_ON_BOARD 361

# define X			0
# define Y			1

# define FACTOR 	2

# define WHITE	1
# define BLACK	2

# define VERTICAL		0
# define HORIZONTAL		1
# define DIAGONAL1		2
# define DIAGONAL2		3

typedef struct node
{
	struct node		*child;
	struct node		*brother;
	unsigned char	x;
	unsigned char	y;
	long			heuristic;
}	t_node;

typedef struct params
{
	int				x;
	int				y;
	signed char		x_increment;
	signed char		y_increment;
	unsigned char	color;
	unsigned char	set_winner;
	int				x_path;
	int				y_path;
	unsigned char	depth;
}	t_params;

typedef struct data
{
	unsigned char	ai_color;
	unsigned char	player_color;
	// unsigned char	**path;
	unsigned char	pos_x;
	unsigned char	pos_y;
	unsigned char	checked[4][SB][SB];
	unsigned char	put_stones[SB][SB];
	unsigned char	winner;
	long			heuristic;
	unsigned char	factor[SB][SB];
	t_params		params;
	int				captures[3];
	FILE			*fd;
}	t_data;

typedef struct pruning
{
	long	alpha;
	long	beta;
}	t_pruning;

typedef struct eval
{
	long	heuristic;
	long	best_heuristic;
}	t_eval;

void			init_data(t_data *data, unsigned char **av);

void			get_path_last(t_data *data);

unsigned char	**get_zone(int *ai_path_length,
					signed char board[SB][SB], int c);

long			minmax(unsigned char depth, t_pruning pruning, t_data *data, t_node *node);

long			max(t_eval eval, unsigned char depth, t_data *data, int x, int y);

long			min(t_eval eval, unsigned char depth, t_data *data, int x, int y);

long			get_alignment_value(unsigned char size_alignment,
					unsigned char neighbours[2],
					unsigned char color, t_data *data);

long			evaluate_stone(t_data *data);

long			get_start_evaluation(t_data *data);

void			free_2d_tab(void **tab);
void			shuffle_2d_tab(void **tab);
int				random_int(int range);
int				length_2d_tab(void **tab);
int				ft_atoi(const char *nptr);

int				compute_single_stone(int x, int y, t_data *data);

long			compute_new_stone(t_data *data, int x, int y,
					unsigned char color, unsigned char depth);

unsigned char	enclosed_stone(int x, int y, t_data *data);

long			compute_alignment(t_data *data, unsigned char direction);

long			compute_prev_alignment(t_data *data, unsigned char color);

unsigned char	get_size_alignment(t_data *data, unsigned char *factor,
					unsigned char *neighbour, unsigned char color);

long			compute_new_alignment(t_data *data, unsigned char color, unsigned char depth);

void			init_increment(t_data *data, signed char x_increment,
					signed char y_increment);

unsigned char	get_opponent_color(t_data *data, unsigned char color);

long			get_alignments_blocking(t_data *data, int x, int y,
					unsigned char color);

unsigned char	is_good_color(t_data *data, unsigned char color, int x, int y);

int				compute_captures(t_data *data, unsigned char captured[16][3],
					unsigned char color);

long			remove_captured_stones(t_data *data,
					unsigned char captured[16][3],
					unsigned char new_captures, unsigned char color,
					unsigned char depth);

void			recover_captured_stones(t_data *data,
					unsigned char captured[16][3],
					unsigned char new_captures, unsigned char color);

void			get_path(t_data *data,
					unsigned char path[PLACES_ON_BOARD][2],
					int *size_path,
					unsigned char color,
					unsigned char depth);

void			create_path(t_data *data,
					unsigned char path[PLACES_ON_BOARD][2],
					int *size_path);

void			sort_path(t_data *data,
					unsigned char path[PLACES_ON_BOARD][2],
					int *size_path,
					unsigned char color,
					unsigned char depth);

long			my_pow(long nb, int pow);

void			check_forced_moves(t_data *data,
					unsigned char path[PLACES_ON_BOARD][2], int *size_path,
					unsigned char color);

unsigned char	alignment_can_be_captured(t_data *data, unsigned char size_alignment,
					int x, int y);

#endif