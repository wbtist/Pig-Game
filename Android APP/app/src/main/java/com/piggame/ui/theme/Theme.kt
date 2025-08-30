package com.piggame.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

// Modern Dark Color Scheme
private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF58A6FF),
    onPrimary = Color(0xFF0D1117),
    primaryContainer = Color(0xFFA5A2FF),
    onPrimaryContainer = Color(0xFF0D1117),
    secondary = Color(0xFF39D0D8),
    onSecondary = Color(0xFF0D1117),
    secondaryContainer = Color(0xFF7EE787),
    onSecondaryContainer = Color(0xFF0D1117),
    tertiary = Color(0xFFFFA657),
    onTertiary = Color(0xFF0D1117),
    error = Color(0xFFDA3633),
    onError = Color(0xFFFFFFFF),
    errorContainer = Color(0xFFF85149),
    onErrorContainer = Color(0xFFFFFFFF),
    background = Color(0xFF0D1117),
    onBackground = Color(0xFFF0F6FC),
    surface = Color(0xFF21262D),
    onSurface = Color(0xFFF0F6FC),
    surfaceVariant = Color(0xFF161B22),
    onSurfaceVariant = Color(0xFF8B949E),
    outline = Color(0xFF30363D),
    outlineVariant = Color(0xFF30363D),
)

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF58A6FF),
    onPrimary = Color(0xFFFFFFFF),
    primaryContainer = Color(0xFFA5A2FF),
    onPrimaryContainer = Color(0xFFFFFFFF),
    secondary = Color(0xFF39D0D8),
    onSecondary = Color(0xFFFFFFFF),
    secondaryContainer = Color(0xFF7EE787),
    onSecondaryContainer = Color(0xFF000000),
    tertiary = Color(0xFFFFA657),
    onTertiary = Color(0xFF000000),
    error = Color(0xFFDA3633),
    onError = Color(0xFFFFFFFF),
    errorContainer = Color(0xFFF85149),
    onErrorContainer = Color(0xFFFFFFFF),
    background = Color(0xFFF8F9FA),
    onBackground = Color(0xFF24292F),
    surface = Color(0xFFFFFFFF),
    onSurface = Color(0xFF24292F),
    surfaceVariant = Color(0xFFF6F8FA),
    onSurfaceVariant = Color(0xFF656D76),
    outline = Color(0xFFD0D7DE),
    outlineVariant = Color(0xFFD0D7DE),
)

@Composable
fun PigGameTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            window.navigationBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}