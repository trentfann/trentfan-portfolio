document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart === 'undefined') return;

  const muted = '#93949f';
  const grid = 'rgba(255,255,255,0.06)';
  const accent = '#7c6cff';
  const accent2 = '#5eead4';

  Chart.defaults.color = muted;
  Chart.defaults.font.family = 'ui-sans-serif, system-ui, sans-serif';
  Chart.defaults.font.size = 11;

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: grid, drawTicks: false }, border: { display: false } },
      y: { grid: { color: grid, drawTicks: false }, border: { display: false }, beginAtZero: true }
    }
  };

  const lineDataset = (data, color) => ({
    data,
    borderColor: color,
    backgroundColor: color + '22',
    fill: true,
    tension: 0,
    pointRadius: 4,
    pointBackgroundColor: color,
    borderWidth: 2
  });

  const barDataset = (data, colors) => ({ data, backgroundColor: colors, borderRadius: 6, barThickness: 40 });

  const el = (id) => document.getElementById(id);

  const sparkOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    elements: { point: { radius: 0 } },
    scales: { x: { display: false }, y: { display: false, beginAtZero: true } }
  };
  const spark = (id, data, color) => {
    if (!el(id)) return;
    new Chart(el(id), { type: 'line', data: { labels: data.map((_, i) => i), datasets: [{ data, borderColor: color, backgroundColor: color + '22', fill: true, tension: .35, borderWidth: 2 }] }, options: sparkOptions });
  };

  // Home hero proof widget
  spark('sparkHeroA', [10, 40, 90, 160, 220, 300], accent2);
  spark('sparkHeroB', [0, 2000, 9000, 18000, 30000], accent);
  spark('sparkHeroC', [0, 1, 2, 3, 4, 5], accent2);

  // Home Selected Results tiles
  spark('sparkA', [10, 40, 90, 160, 220, 300], accent2);
  spark('sparkB', [20, 60, 100, 140, 180], accent);
  spark('sparkC', [0, 1, 2, 3, 4, 5], accent2);
  spark('sparkD', [0, 2000, 9000, 18000, 30000], accent);

  // Home featured case teaser
  spark('sparkFeatured', [0, 1, 2, 3, 4, 5], accent2);

  if (el('chartEmatic')) {
    new Chart(el('chartEmatic'), {
      type: 'line',
      data: { labels: ['Launch', 'Month 4'], datasets: [lineDataset([0, 5], accent2)] },
      options: { ...baseOptions, scales: { ...baseOptions.scales, y: { ...baseOptions.scales.y, ticks: { stepSize: 1 } } } }
    });
  }

  if (el('chartDaohechian')) {
    new Chart(el('chartDaohechian'), {
      type: 'line',
      data: { labels: ['Feb 2026', 'Present'], datasets: [lineDataset([0, 30000], accent)] },
      options: baseOptions
    });
  }

  if (el('chartFCS')) {
    new Chart(el('chartFCS'), {
      type: 'bar',
      data: { labels: ['Before', 'After'], datasets: [barDataset([100, 400], [grid, accent])] },
      options: baseOptions
    });
  }

  if (el('chartSpaceship')) {
    new Chart(el('chartSpaceship'), {
      type: 'bar',
      data: { labels: ['Before', 'After'], datasets: [barDataset([100, 280], [grid, accent2])] },
      options: baseOptions
    });
  }

  if (el('chartEmaticBar')) {
    new Chart(el('chartEmaticBar'), {
      type: 'bar',
      data: { labels: ['Before', 'After'], datasets: [barDataset([0, 5], [grid, accent2])] },
      options: { ...baseOptions, scales: { ...baseOptions.scales, y: { ...baseOptions.scales.y, ticks: { stepSize: 1 } } } }
    });
  }

  if (el('chartDaohechianBar')) {
    new Chart(el('chartDaohechianBar'), {
      type: 'bar',
      data: { labels: ['Before', 'After'], datasets: [barDataset([0, 150], [grid, accent])] },
      options: baseOptions
    });
  }

  if (el('chartFCSLine')) {
    new Chart(el('chartFCSLine'), {
      type: 'line',
      data: { labels: ['Before', 'After'], datasets: [lineDataset([100, 400], accent)] },
      options: baseOptions
    });
  }

  if (el('chartSpaceshipLine')) {
    new Chart(el('chartSpaceshipLine'), {
      type: 'line',
      data: { labels: ['Before', 'After'], datasets: [lineDataset([100, 280], accent2)] },
      options: baseOptions
    });
  }
});
