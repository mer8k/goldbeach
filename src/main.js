import './style.css'

// Add any interactions like the close button for the floating box
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector('.close-btn');
  const floatingBox = document.querySelector('.sidebar-offer');
  
  if (closeBtn && floatingBox) {
    closeBtn.addEventListener('click', () => {
      floatingBox.style.display = 'none';
    });
  }

  // Menu Tab Switching Logic
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuLists = document.querySelectorAll('.menu-list');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and lists
      menuTabs.forEach(t => t.classList.remove('active'));
      menuLists.forEach(l => l.classList.remove('active'));

      // Add active class to clicked tab
      tab.classList.add('active');

      // Show corresponding menu list
      const targetId = tab.getAttribute('data-target');
      const targetList = document.getElementById(targetId);
      if (targetList) {
        targetList.classList.add('active');
      }
    });
  });

  // Reservation Form WhatsApp Logic
  const resForm = document.getElementById('reservationForm');
  const resDateInput = document.getElementById('resDate');

  // Initialize Flatpickr for a premium calendar design
  if (resDateInput && window.flatpickr) {
    flatpickr(resDateInput, {
      locale: "tr",
      dateFormat: "Y-m-d", // Keeping standard value format for backend/js, but flatpickr formats display
      altInput: true,
      altFormat: "d.m.Y",
      minDate: "today",
      disableMobile: true, // Force the custom flatpickr UI on mobile instead of native picker
      position: "above"    // Force calendar to open upwards so it doesn't overflow the footer
    });
  }

  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('resName').value.trim();
      const surname = document.getElementById('resSurname').value.trim();
      const date = document.getElementById('resDate').value;
      const guests = document.getElementById('resGuests').value;
      
      // Format date for better readability (from YYYY-MM-DD to DD.MM.YYYY)
      let formattedDate = date;
      if (date) {
        const parts = date.split('-');
        if (parts.length === 3) {
          formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
        }
      }
      
      const message = `Merhaba, Gold Beach'e rezervasyon yaptırmak istiyorum.%0A%0A*İsim:* ${name} ${surname}%0A*Tarih:* ${formattedDate}%0A*Kişi Sayısı:* ${guests}`;
      const waUrl = `https://wa.me/905326545133?text=${message}`;
      
      window.open(waUrl, '_blank');
    });
  }
});
