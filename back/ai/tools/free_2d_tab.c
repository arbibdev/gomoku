/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   free_2d_tab.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/13 22:54:19 by adauchy           #+#    #+#             */
/*   Updated: 2023/01/13 22:54:21 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include "../gomoku.h"

void	free_2d_tab(void **tab)
{
	int		n;

	n = 0;
	if (!tab)
		return ;
	while (tab[n])
	{
		free(tab[n]);
		n++;
	}
	free(tab);
}
