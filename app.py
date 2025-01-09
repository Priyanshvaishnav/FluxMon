from flask import Flask, jsonify, render_template
import psutil
import platform

app = Flask(__name__)

@app.route("/")
def home():
    """Serve the main dashboard HTML."""
    return render_template("index.html")

@app.route("/api/cpu")
def get_cpu_usage():
    """API to get CPU usage."""
    return jsonify({"usage": psutil.cpu_percent(interval=1)})

@app.route("/api/memory")
def get_memory_usage():
    """API to get memory usage."""
    memory = psutil.virtual_memory()
    return jsonify({
        "total": memory.total,
        "available": memory.available,
        "used": memory.used,
        "percent": memory.percent
    })

@app.route("/api/disk")
def get_disk_usage():
    """API to get disk usage."""
    disk = psutil.disk_usage('/')
    return jsonify({
        "total": disk.total,
        "used": disk.used,
        "free": disk.free,
        "percent": disk.percent
    })

@app.route("/api/network")
def get_network_activity():
    """API to get network activity."""
    net_io = psutil.net_io_counters()
    return jsonify({
        "bytes_sent": net_io.bytes_sent,
        "bytes_recv": net_io.bytes_recv
    })

@app.route("/api/battery")
def get_battery_status():
    """API to get battery information."""
    battery = psutil.sensors_battery()
    if battery:
        return jsonify({
            "percent": battery.percent,
            "charging": battery.power_plugged,
            "time_left": battery.secsleft
        })
    else:
        return jsonify({"error": "No battery detected"})

@app.route("/api/system")
def get_system_info():
    """API to get system information."""
    return jsonify({
        "architecture": platform.architecture(),
        "platform": platform.system(),
        "version": platform.version(),
        "processor": platform.processor(),
        "machine": platform.machine(),
    })

@app.route("/api/activity")
def get_activity():
    """API to get list of active processes."""
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent']):
        processes.append(proc.info)
    return jsonify(processes)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8050, debug=True)
