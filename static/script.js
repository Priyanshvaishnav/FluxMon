function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => section.classList.remove("active"));
  
    const activeSection = document.getElementById(sectionId);
    if (activeSection) activeSection.classList.add("active");
  }
  
  function fetchData() {
    fetch('/api/cpu').then(res => res.json()).then(data => {
      document.getElementById('cpu-usage').textContent = `${data.usage}%`;
    });
  
    fetch('/api/memory').then(res => res.json()).then(data => {
      document.getElementById('ram-total').textContent = (data.total / 1e9).toFixed(2);
      document.getElementById('ram-used').textContent = (data.used / 1e9).toFixed(2);
      document.getElementById('ram-available').textContent = (data.available / 1e9).toFixed(2);
    });
  
    fetch('/api/disk').then(res => res.json()).then(data => {
      document.getElementById('storage-total').textContent = (data.total / 1e9).toFixed(2);
      document.getElementById('storage-used').textContent = (data.used / 1e9).toFixed(2);
      document.getElementById('storage-free').textContent = (data.free / 1e9).toFixed(2);
    });
  
    fetch('/api/battery').then(res => res.json()).then(data => {
      if (!data.error) {
        document.getElementById('battery-percent').textContent = `${data.percent}%`;
        document.getElementById('battery-charging').textContent = data.charging ? 'Yes' : 'No';
        document.getElementById('battery-time').textContent = `${Math.floor(data.time_left / 60)} mins`;
      }
    });
  
    fetch('/api/system').then(res => res.json()).then(data => {
      document.getElementById('system-arch').textContent = data.architecture[0];
      document.getElementById('system-platform').textContent = data.platform;
      document.getElementById('system-version').textContent = data.version;
      document.getElementById('system-processor').textContent = data.processor;
      document.getElementById('system-machine').textContent = data.machine;
    });
  
    fetch('/api/activity').then(res => res.json()).then(processes => {
      const list = document.getElementById('process-list');
      list.innerHTML = '';
      processes.forEach(proc => {
        const li = document.createElement('li');
        li.textContent = `PID: ${proc.pid}, Name: ${proc.name}, CPU: ${proc.cpu_percent}%`;
        list.appendChild(li);
      });
    });
  }
  
  setInterval(fetchData, 2000);
  showSection('cpu');
  fetchData();
  