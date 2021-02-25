
type Props = {
    currentHealth: number,
    maxHealth: number
}

export function MiniHealthBar({ currentHealth, maxHealth }: Props) {
    return (
      <div className="mini-health-bar player-stats-health">
          <div>
              <span className="mini-current-health">{currentHealth}/{maxHealth}</span>
              <div style={{width: percentage(currentHealth, maxHealth) + "%"}}/>
          </div>
      </div>
    );
}

function percentage(partialValue: number, totalValue: number) {
    return (100 * partialValue) / totalValue;
}