  // JavaScript para a funcionalidade de agendamento
        document.addEventListener('DOMContentLoaded', function() {
            const monthYearElement = document.getElementById('month-year');
            const daysGridElement = document.getElementById('days-grid');
            const timeSlotsElement = document.getElementById('time-slot-list');
            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');
            const finalizeBtn = document.getElementById('finalize-button');

            // Data atual
            const today = new Date();
            let currentMonth = today.getMonth();
            let currentYear = today.getFullYear();
            let selectedDate = null;
            let selectedTime = null;

            // Horários agendados (simulando dados persistentes)
            const bookedSlots = new Set([
                '2025-07-15-13:00',
                '2025-07-15-14:00',
                '2025-07-20-10:00',
                '2025-07-25-15:00'
            ]);

            // Horários disponíveis
            const availableHours = [
                '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
            ];

            // Nomes dos meses
            const monthNames = [
                'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
                'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
            ];

            // Função para atualizar o cabeçalho do calendário
            function updateCalendarHeader() {
                monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
            }

            // Função para gerar os dias do calendário
            function generateCalendar() {
                daysGridElement.innerHTML = '';
                
                const firstDay = new Date(currentYear, currentMonth, 1);
                const lastDay = new Date(currentYear, currentMonth + 1, 0);
                const daysInMonth = lastDay.getDate();
                const startingDayOfWeek = firstDay.getDay();

                // Adicionar dias vazios do início
                for (let i = 0; i < startingDayOfWeek; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.className = 'day empty';
                    daysGridElement.appendChild(emptyDay);
                }

                // Adicionar dias do mês
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'day';
                    dayElement.textContent = day;
                    dayElement.setAttribute('data-date', `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

                    // Marcar dia atual
                    if (currentYear === today.getFullYear() && 
                        currentMonth === today.getMonth() && 
                        day === today.getDate()) {
                        dayElement.classList.add('today');
                    }

                    // Desabilitar dias passados
                    const dayDate = new Date(currentYear, currentMonth, day);
                    if (dayDate < today) {
                        dayElement.classList.add('disabled');
                    } else {
                        dayElement.addEventListener('click', function() {
                            selectDate(this);
                        });
                    }

                    daysGridElement.appendChild(dayElement);
                }
            }

            // Função para selecionar uma data
            function selectDate(dayElement) {
                if (dayElement.classList.contains('disabled')) return;

                // Remover seleção anterior
                document.querySelectorAll('.day.selected').forEach(day => {
                    day.classList.remove('selected');
                });

                // Selecionar nova data
                dayElement.classList.add('selected');
                selectedDate = dayElement.getAttribute('data-date');
                selectedTime = null;

                // Gerar horários para a data selecionada
                generateTimeSlots();
                updateFinalizeButton();
            }

            // Função para gerar horários disponíveis
            function generateTimeSlots() {
                if (!selectedDate) {
                    timeSlotsElement.innerHTML = '<div class="no-date">Selecione uma data</div>';
                    return;
                }

                timeSlotsElement.innerHTML = '';

                availableHours.forEach(hour => {
                    const slotKey = `${selectedDate}-${hour}`;
                    const isBooked = bookedSlots.has(slotKey);

                    const timeSlot = document.createElement('div');
                    timeSlot.className = `time-slot ${isBooked ? 'booked' : ''}`;
                    timeSlot.innerHTML = `
                        <span class="time">${hour.replace(':', ' - ')}h</span>
                    `;

                    if (!isBooked) {
                        timeSlot.addEventListener('click', function() {
                            selectTimeSlot(this, hour);
                        });
                    }

                    timeSlotsElement.appendChild(timeSlot);
                });
            }

            // Função para selecionar um horário
            function selectTimeSlot(slotElement, time) {
                // Remover seleção anterior
                document.querySelectorAll('.time-slot.selected').forEach(slot => {
                    slot.classList.remove('selected');
                });

                // Selecionar novo horário
                slotElement.classList.add('selected');
                selectedTime = time;
                updateFinalizeButton();
            }

            // Função para atualizar o botão finalizar
            function updateFinalizeButton() {
                if (selectedDate && selectedTime) {
                    finalizeBtn.disabled = false;
                    finalizeBtn.classList.add('active');
                } else {
                    finalizeBtn.disabled = true;
                    finalizeBtn.classList.remove('active');
                }
            }

            // Navegação entre meses
            prevMonthBtn.addEventListener('click', function() {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                updateCalendarHeader();
                generateCalendar();
                selectedDate = null;
                selectedTime = null;
                generateTimeSlots();
                updateFinalizeButton();
            });

            nextMonthBtn.addEventListener('click', function() {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                updateCalendarHeader();
                generateCalendar();
                selectedDate = null;
                selectedTime = null;
                generateTimeSlots();
                updateFinalizeButton();
            });

            // Finalizar agendamento
            finalizeBtn.addEventListener('click', function() {
                if (selectedDate && selectedTime) {
                    const slotKey = `${selectedDate}-${selectedTime}`;
                    bookedSlots.add(slotKey);
                    
                    // Feedback visual
                    alert(`Agendamento confirmado para ${selectedDate} às ${selectedTime}!`);
                    
                    // Resetar seleções
                    selectedDate = null;
                    selectedTime = null;
                    document.querySelectorAll('.day.selected').forEach(day => {
                        day.classList.remove('selected');
                    });
                    generateTimeSlots();
                    updateFinalizeButton();
                }
            });

            // Inicializar calendário
            updateCalendarHeader();
            generateCalendar();
            generateTimeSlots();
        });