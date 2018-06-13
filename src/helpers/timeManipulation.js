import moment from 'moment';

export function poolExpiration(finalDate) {
  const now = moment();
  const to = moment(finalDate);
  const isBefore = now.isBefore(to);

  if (isBefore) {
    // const diffTime = moment.duration(to.diff(now));
    // const dayLabel = diffTime.days() > 1 ? 'dias' : 'dia';

    // return `Expira em ${to.format('DD/MM/YYYY [às] HH:mm:ss')} - Tempo restante: ${diffTime.days()} ${dayLabel} ${diffTime.hours()}:${diffTime.minutes()}:${diffTime.seconds()}`
    return `Expira em ${to.format('DD/MM/YYYY [às] HH:mm:ss')}`
  } else {
    return `Votação expirada`;
  }
}