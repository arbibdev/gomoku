/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_atoi.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adauchy <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/11/07 07:43:02 by adauchy           #+#    #+#             */
/*   Updated: 2017/11/09 15:42:03 by adauchy          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int	ft_isdigit(int c)
{
	if (c >= '0' && c <= '9')
		return (1);
	return (0);
}

static int	place_count(int *count, const char *nptr)
{
	while (nptr[*count] == ' ' || nptr[*count] == '\n'
		|| nptr[*count] == '\t' || nptr[*count] == '\v'
		|| nptr[*count] == '\r' || nptr[*count] == '\f')
		(*count)++;
	if (nptr[*count] == '-')
	{
		(*count)++;
		return (-1);
	}
	if (nptr[*count] == '+')
		(*count)++;
	return (1);
}

int	ft_atoi(const char *nptr)
{
	long	nb;
	int		count;
	int		neg;

	nb = 0;
	count = 0;
	neg = 0;
	if (place_count(&count, nptr) == -1)
		neg = 1;
	while (nptr[count] != '\0' && ft_isdigit(nptr[count]))
	{
		nb = nb * 10 + nptr[count] - '0';
		count++;
		if (!neg && count == 19)
			return (-1);
		if (neg && count == 19)
			return (0);
	}
	if (neg)
		return ((int)-nb);
	return ((int)nb);
}
