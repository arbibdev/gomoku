/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   shuffle_2d_tab.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/15 13:46:53 by adauchy           #+#    #+#             */
/*   Updated: 2023/01/15 13:46:54 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../gomoku.h"

void	swap(void **tab, int a, int b)
{
	char	*save;

	save = tab[a];
	tab[a] = tab[b];
	tab[b] = save;
}

void	shuffle_2d_tab(void **tab)
{
	int		length_tab;
	int		c;

	length_tab = length_2d_tab(tab);
	c = 0;
	while (c < length_tab - 1)
	{
		swap(tab, c, random_int(length_tab - c) + c);
		c += 1;
	}
}
