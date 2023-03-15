/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   random_int.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <adauchy@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/15 13:46:45 by adauchy           #+#    #+#             */
/*   Updated: 2023/01/15 13:46:47 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int	random_int(int range)
{
	srand(time(NULL));
	return (rand() % range);
}
