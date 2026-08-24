using System;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Core.Common
{
    public class CoreLoggerProvider : ILoggerProvider
    {
        public ILogger CreateLogger(string categoryName)
        {
            return new CoreLogger(categoryName);
        }

        public void Dispose() { }
    }

    public class CoreLogger : ILogger
    {
        private readonly string _categoryName;

        public CoreLogger(string categoryName)
        {
            _categoryName = categoryName;
        }

        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;

        public bool IsEnabled(LogLevel logLevel) => logLevel != LogLevel.None;

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
        {
            if (!IsEnabled(logLevel)) return;

            string message = formatter(state, exception);
            string formattedMessage = $"[{_categoryName}] {message}";

            if (exception != null)
            {
                formattedMessage += $" \nException: {exception.Message}\n{exception.StackTrace}";
            }

            switch (logLevel)
            {
                case LogLevel.Critical:
                case LogLevel.Error:
                    Logger.Error(formattedMessage);
                    break;
                case LogLevel.Warning:
                    Logger.Warn(formattedMessage);
                    break;
                case LogLevel.Information:
                    Logger.Info(formattedMessage);
                    break;
                case LogLevel.Debug:
                case LogLevel.Trace:
                    Logger.Info(formattedMessage);
                    break;
            }
        }
    }
}