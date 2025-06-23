const doctorsBySpecialty = {
  'Терапевт': ['Иванов И.И.', 'Петров П.П.'],
  'Хирург': ['Сидоров С.С.']
};

const btnInfo = document.getElementById('btn-info');
const btnAppointment = document.getElementById('btn-appointment');
const sectionInfo = document.getElementById('info');
const sectionAppointment = document.getElementById('appointment');

function showSection(section) {
  [sectionInfo, sectionAppointment].forEach(s => s.classList.add('hidden'));
  section.classList.remove('hidden');
}

btnInfo.onclick = () => showSection(sectionInfo);
btnAppointment.onclick = () => showSection(sectionAppointment);

const specialtySelect = document.getElementById('specialty');
const doctorSelect = document.getElementById('doctor');

specialtySelect.addEventListener('change', () => {
  const specialty = specialtySelect.value;
  doctorSelect.innerHTML = '';
  if (doctorsBySpecialty[specialty]) {
    doctorsBySpecialty[specialty].forEach(doc => {
      const option = document.createElement('option');
      option.value = doc;
      option.textContent = doc;
      doctorSelect.appendChild(option);
    });
  } else {
    const option = document.createElement('option');
    option.textContent = 'Сначала выберите специальность';
    doctorSelect.appendChild(option);
  }
});

const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

const appointmentForm = document.getElementById('appointment-form');
const appointmentMessage = document.getElementById('appointment-message');

appointmentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    specialty: specialtySelect.value,
    doctor: doctorSelect.value,
    date: dateInput.value,
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim()
  };

  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (response.ok) {
      appointmentMessage.textContent = `Спасибо, ${data.name}! Ваша запись принята.`;
      appointmentForm.reset();
      doctorSelect.innerHTML = '<option>Сначала выберите специальность</option>';
    } else {
      appointmentMessage.textContent = `Ошибка: ${result.error}`;
    }
  } catch (error) {
    appointmentMessage.textContent = 'Ошибка сети, попробуйте позже.';
  }
});
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

themeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

const docsBtn = document.getElementById('docs-btn');
const docsModal = document.getElementById('docs-modal');
const closeDocs = document.getElementById('close-docs');

docsBtn.addEventListener('click', () => {
  docsModal.style.display = 'flex';
});

closeDocs.addEventListener('click', () => {
  docsModal.style.display = 'none';
});


docsModal.addEventListener('click', (e) => {
  if (e.target === docsModal) {
    docsModal.style.display = 'none';
  }
});


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && docsModal.style.display === 'flex') {
    docsModal.style.display = 'none';
  }
});