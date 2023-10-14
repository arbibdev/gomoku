CC	=	gcc

RM	=	rm -f

NAME	=	ai

CFLAGS	=	-Wextra -Wall -Werror -g3

LIB		=	-lm

SRCS	=	main.c								\
			minmax.c 							\
			aiTools.c							\
			init_data.c							\
			get_zone.c							\
			get_start_evaluation.c				\
			evaluate_stone.c					\
			get_alignment_value.c				\
			compute_new_stone.c					\
			compute_single_stone.c				\
			enclosed_stone.c					\
			compute_alignment.c					\
			compute_prev_alignment.c			\
			get_size_alignment.c				\
			compute_new_alignment.c				\
			init_params.c						\
			get_alignments_blocking.c			\
			get_opponent_color.c				\
			is_good_color.c						\
			compute_captures.c					\
			remove_captured_stones.c			\
			recover_captured_stones.c			\
			get_path.c							\
			create_path.c						\
			sort_path.c							\
			my_pow.c							\
			check_forced_moves.c				\
			alignment_can_be_captured.c			\
			tools/free_2d_tab.c 				\
			tools/random_int.c					\
			tools/shuffle_2d_tab.c				\
			tools/length_2d_tab.c				\
			tools/ft_atoi.c						\

HEADERS	=	gomoku.h

OBJS	=	$(SRCS:.c=.o)

all		:	$(NAME)

$(NAME)	:	$(OBJS)
			$(CC) -o $(NAME) $(CFLAGS) $(OBJS) $(LIB)

%.o		:	%.c $(HEADERS)
			$(CC) $(CFLAGS) -c $< -o $@


clean	:
			$(RM) $(OBJS)

fclean	:	clean
			$(RM) $(NAME)

re		:	fclean all

.PHONY	:	all clean fclean all